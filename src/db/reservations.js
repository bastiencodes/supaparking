import { supabase } from "../supabaseClient";

const TABLE_NAME = "reservations";

export const getReservations = async () => {
  const reservations = await supabase.from(TABLE_NAME);
  console.log(reservations);
  return reservations;
};

export const createReservation = (reservation) => {
  const user = supabase.auth.user();
  const values = [{ user_id: user.id, ...reservation }];
  return supabase.from(TABLE_NAME).insert(values);
};
