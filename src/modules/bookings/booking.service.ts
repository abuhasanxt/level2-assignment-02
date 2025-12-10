import { pool } from "../../config/db";

const createBooking = async (
  customer_id: number,
  vehicle_id: number,
  rent_start_date: string,
  rent_end_date: string
) => {

  const vehicleRes = await pool.query(
    `SELECT * FROM vehicles WHERE id=$1`,
    [vehicle_id]
  );

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

export const bookingServices = {
  createBooking,
};
