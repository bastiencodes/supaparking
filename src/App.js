import "./index.css";
import { useState, useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Spinner } from "evergreen-ui";

import { ACCOUNT, CHECK, PAY, RESERVATIONS } from "./routes/routes";
import { supabase } from "./supabaseClient";

import Header from "./layout/Header";
import SideNav from "./layout/SideNav";
import SignUp from "./auth/SignUp";
import LogIn from "./auth/LogIn";
import Account from "./pages/Account";
import Pay from "./pages/Pay";
import Reservations from "./pages/Reservations";
import { getProfile } from "./db/profile";
import Check from "./pages/Check";

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
            type: data.type,
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
          <Header session={session} />
          <div className="container">
            <SideNav />
            <main>
              <Switch>
                <Route path={PAY} exact>
                  <Pay />
                </Route>
                <Route path={CHECK} exact>
                  <Check />
                </Route>
                <Route path={RESERVATIONS} exact>
                  <Reservations />
                </Route>
                <Route path={ACCOUNT} exact>
                  <Account session={session} />
                </Route>
                <Redirect to={RESERVATIONS} />
              </Switch>
            </main>
          </div>
        </>
      ) : (
        <SignUp />
      )}
    </>
  );
}
