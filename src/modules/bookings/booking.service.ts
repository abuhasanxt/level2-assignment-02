import { pool } from "../../config/db";

const createBooking = async (
  customer_id: number,
  vehicle_id: number,
  rent_start_date: string,
  rent_end_date: string
) => {
  const vehicleRes = await pool.query(`SELECT * FROM vehicles WHERE id=$1`, [
    vehicle_id,
  ]);

  if (vehicleRes.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  if (vehicleRes.rows[0].availability_status !== "available") {
    throw new Error("Vehicle is not available");
  }

  const vehicle = vehicleRes.rows[0];

  const start = new Date(rent_start_date);
  const end = new Date(rent_end_date);

  if (end <= start) throw new Error("End date must be after start date");

  const days = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
  const total_price = vehicle.daily_rent_price * days;

  const bookingRes = await pool.query(
    `
      INSERT INTO bookings
      (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status)
      VALUES ($1, $2, $3, $4, $5, 'active')
      RETURNING *;
    `,
    [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]
  );

  await pool.query(
    `UPDATE vehicles SET availability_status='booked' WHERE id=$1`,
    [vehicle_id]
  );

  return {
    ...bookingRes.rows[0],
    vehicle: {
      vehicle_name: vehicle.vehicle_name,
      daily_rent_price: vehicle.daily_rent_price,
    },
  };
};

const getAllBooking = async (userId: number, role: string) => {
  let result;

  if (role === "admin") {
    result = await pool.query(`
      SELECT b.*, 
             json_build_object(
               'vehicle_name', v.vehicle_name,
               'daily_rent_price', v.daily_rent_price
             ) AS vehicle
      FROM bookings b
      JOIN vehicles v ON b.vehicle_id = v.id
      ORDER BY b.id DESC
    `);
  } else {
    result = await pool.query(
      `
      SELECT b.*, 
             json_build_object(
               'vehicle_name', v.vehicle_name,
               'daily_rent_price', v.daily_rent_price
             ) AS vehicle
      FROM bookings b
      JOIN vehicles v ON b.vehicle_id = v.id
      WHERE b.customer_id = $1
      ORDER BY b.id DESC
    `,
      [userId]
    );
  }

  return result.rows;
};
const updateBooking = async (
  bookingId: string,
  status: string,
  userRole: string
) => {
 
  const bookingRes = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [
    bookingId,
  ]);

  if (bookingRes.rows.length === 0) {
    throw new Error("Booking not found");
  }

  const booking = bookingRes.rows[0];

  
  if (userRole === "customer") {
    if (status !== "cancelled") {
      throw new Error("Customer can only cancel booking");
    }

    const today = new Date();
    const startDate = new Date(booking.rent_start_date);

    if (today >= startDate) {
      throw new Error("Cannot cancel booking after start date");
    }
  }

  if (userRole === "admin") {
    if (status !== "returned") {
      throw new Error("Admin can only mark as returned");
    }

   
    await pool.query(
      `UPDATE vehicles SET availability_status='available' WHERE id=$1`,
      [booking.vehicle_id]
    );
  }


  const result = await pool.query(
    `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
    [status, bookingId]
  );

  return result.rows[0];
};




export const bookingServices = {
  createBooking,
  getAllBooking,
  updateBooking,
};
