import { supabase } from "../supabaseClient";

const TABLE_NAME = "profiles";

export const getProfile = async () => {
  const user = supabase.auth.user();
  if (!user) return null;
  let { data, error, status } = await supabase
    .from(TABLE_NAME)
    .select(`id`)
    .eq("id", user.id)
    .single();

  // console.log(data, error, status);
  return { data, error, status };
};

export const createProfile = async ({ username }) => {
  const user = supabase.auth.user();
  const values = {
    id: user.id,
    username,
    updated_at: new Date(),
  };

  return supabase.from("profiles").insert(values, {
    returning: "minimal", // Don't return the value after inserting
  });
};
