import "./index.css";
import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import Auth from "./Auth";
import Account from "./Account";
import Nav from "./Nav";
import SignUp from "./SignUp";

const getUser = async () => {
  const user = supabase.auth.user();
  let { data, error, status } = await supabase
    .from("profiles")
    .select(`id`)
    .eq("id", user.id)
    .single();
  // console.log(data, error, status);
  return { data, error, status };
};

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function getUserAndSetSession() {
      getUser().then(({ data, error, status }) => {
        const isCreated = data && !error && status === 200;
        console.log(
          isCreated ? "User exists in DB." : "User does not exist in DB."
        );
        const session = {
          ...supabase.auth.session(),
          isCreated,
        };
        setSession(session);
      });
    }

    getUserAndSetSession();

    supabase.auth.onAuthStateChange(async (_event, session) => {
      getUserAndSetSession();
    });
  }, []);

  return (
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
