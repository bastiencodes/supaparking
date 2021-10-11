import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { Card, Heading } from "evergreen-ui";

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(null);
  const [type, setType] = useState(null);
  const [created_at, setCreatedAt] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);

      const user = supabase.auth.user();

      setEmail(user.email);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`*`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setType(data.type);
        setCreatedAt(data.created_at);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <Heading>Email: {email}</Heading>
      <Heading>Type: {type}</Heading>
      <Heading>Created at: {created_at}</Heading>
    </Card>
  );
}
