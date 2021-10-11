import { supabase } from "../supabaseClient";

const TABLE_NAME = "profiles";

export const getProfile = async () => {
  const user = supabase.auth.user();
  if (!user) return null;
  let { data, error, status } = await supabase
    .from(TABLE_NAME)
    .select("type")
    .eq("id", user.id)
    .single();

  // console.log(data, error, status);
  return { data, error, status };
};

export const createProfile = async (type) => {
  const user = supabase.auth.user();
  const values = [
    {
      id: user.id,
      type,
    },
  ];

  return supabase.from(TABLE_NAME).insert(values, {
    // Don't return the value after inserting
    returning: "minimal",
  });
};
