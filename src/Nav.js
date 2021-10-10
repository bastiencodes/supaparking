import { Button, Heading, LogInIcon, LogOutIcon } from "evergreen-ui";
import { supabase } from "./supabaseClient";

export default function Nav({ session }) {
  return (
    <nav border="default">
      <Heading flex={1}>SupaParking</Heading>
      {!session ? (
        <Button iconAfter={LogInIcon}>Log In</Button>
      ) : (
        <Button onClick={() => supabase.auth.signOut()} iconAfter={LogOutIcon}>
          Log Out
        </Button>
      )}
    </nav>
  );
}
