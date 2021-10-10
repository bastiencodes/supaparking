import { Button, Heading, LogInIcon, LogOutIcon } from "evergreen-ui";
import { supabase } from "./supabaseClient";

export default function Header({ session }) {
  return (
    <header border="default">
      <Heading flex={1}>SupaParking</Heading>
      {session && session.isCreated ? (
        <Button onClick={() => supabase.auth.signOut()} iconAfter={LogOutIcon}>
          Log Out
        </Button>
      ) : (
        <Button iconAfter={LogInIcon}>Log In</Button>
      )}
    </header>
  );
}
