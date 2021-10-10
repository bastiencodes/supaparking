import { useEffect, useState } from "react";
import { Button, SelectField, TextInputField } from "evergreen-ui";
import { createProfile } from "./db/profile";
import { supabase } from "./supabaseClient";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState("");

  useEffect(() => {
    const user = supabase.auth.user();
    setEmail(user.email);
  }, []);

  const handleSignUp = async (type) => {
    try {
      setLoading(true);
      const { error } = await createProfile(type);
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
        disabled
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
          handleSignUp(accountType);
        }}
      >
        Continue
      </Button>
    </form>
  );
}
