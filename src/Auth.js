import { Button, Heading, Pane, Text, TextInputField } from "evergreen-ui";
import { useState } from "react";
import { supabase } from "./supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pane padding={40}>
      <Heading>Supabase + React</Heading>
      <Text>Sign in via magic link with your email below</Text>
      <TextInputField
        id="email"
        label="Email"
        required
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Button
        isLoading={loading}
        onClick={(e) => {
          e.preventDefault();
          handleLogin(email);
        }}
      >
        Send magic link
      </Button>
    </Pane>
  );
}
