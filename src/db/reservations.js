import { supabase } from "../supabaseClient";

const TABLE_NAME = "reservations";

export const checkIfReservationExpired = async (plate) => {
  // get reservations that match license plate and have expiry in the future
  const reservations = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("license_plate", plate)
    .gt("expiry", new Date().toISOString());

  // if we have ongoing reservations for this license plate, isReservationExpired = false
  return !reservations.length;
};

export const getPastReservations = async () => {
  const reservations = await supabase
    .from(TABLE_NAME)
    .select("*")
    .lt("expiry", new Date().toISOString());
  console.log(reservations);
  return reservations;
};

export const getCurrentReservations = async () => {
  const reservations = await supabase
    .from(TABLE_NAME)
    .select("*")
    .gt("expiry", new Date().toISOString());
  console.log(reservations);
  return reservations;
};

export const createReservation = (reservation) => {
  const user = supabase.auth.user();
  const values = [{ user_id: user.id, ...reservation }];
  return supabase.from(TABLE_NAME).insert(values);
};
