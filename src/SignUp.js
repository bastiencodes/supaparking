import { useState } from "react";
import { Button, SelectField, TextInputField } from "evergreen-ui";
import { supabase } from "./supabaseClient";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState("");

  const createProfile = async ({ username }) => {
    setLoading(true);

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

  const handleSignUp = async (email) => {
    try {
      setLoading(true);
      const { error } = await createProfile({ username: "test" });
      if (error) throw error;
      setLoading(false);
      // TODO: get rid of hack by using react-router
      window.location.reload();
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form>
      <TextInputField
        id="email"
        label="Email"
        required
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <SelectField
        label="Account type"
        required
        value={accountType}
        onChange={(e) => setAccountType(e.target.value)}
      >
        <option value="user" selected>
          User
        </option>
        <option value="admin">Admin</option>
      </SelectField>

      <Button
        isLoading={loading}
        onClick={(e) => {
          e.preventDefault();
          handleSignUp(email);
        }}
      >
        Continue
      </Button>
    </form>
  );
}
