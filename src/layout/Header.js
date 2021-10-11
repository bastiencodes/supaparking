import { Button, Heading, LogInIcon, LogOutIcon } from "evergreen-ui";
import { supabase } from "../supabaseClient";

export default function Header({ session }) {
  return (
    <header id="header" border="default">
      <Heading flex={1}>SupaParking</Heading>
      {session && session.isCreated ? (
        <Button
          onClick={() => {
            supabase.auth.signOut().then(() => {
              // TODO: get rid of hack by using react-router
              window.location.reload();
            });
          }}
          iconAfter={LogOutIcon}
        >
          Log Out
        </Button>
      ) : (
        <Button iconAfter={LogInIcon}>Log In</Button>
      )}
    </header>
  );
}
