import "./index.css";
import { useState, useEffect } from "react";
import { Spinner } from "evergreen-ui";
import { supabase } from "./supabaseClient";
import LogIn from "./auth/LogIn";
import Account from "./Account";
import Nav from "./Nav";
import SignUp from "./auth/SignUp";
import { getProfile } from "./db/profile";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function getProfileAndSetSession() {
      getProfile()
        .then((res) => {
          if (!res) return;
          const { data, error, status } = res;
          const isCreated = data && !error && status === 200;
          console.log(
            isCreated ? "User exists in DB." : "User does not exist in DB."
          );
          const session = {
            ...supabase.auth.session(),
            isCreated,
          };
          setSession(session);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    getProfileAndSetSession();

    supabase.auth.onAuthStateChange(async (_event, session) => {
      getProfileAndSetSession();
    });
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <>
      {!session ? (
        <LogIn />
      ) : session.isCreated ? (
        <>
          <Nav session={session} />
          <main>
            <Account session={session} />
          </main>
        </>
      ) : (
        <SignUp />
      )}
    </>
  );
}
