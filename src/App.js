import "./index.css";
import { useState, useEffect } from "react";
import { Spinner } from "evergreen-ui";
import { supabase } from "./supabaseClient";
import Auth from "./Auth";
import Account from "./Account";
import Nav from "./Nav";
import SignUp from "./SignUp";
import { getProfile } from "./db/profile";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function getProfileAndSetSession() {
      getProfile().then((res) => {
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
        setLoading(false);
        setSession(session);
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
      <Nav session={session} />
      <main>
        {!session ? (
          <Auth />
        ) : session.isCreated ? (
          <Account session={session} />
        ) : (
          <SignUp />
        )}
      </main>
    </>
  );
}
