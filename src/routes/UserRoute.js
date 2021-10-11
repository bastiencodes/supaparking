import { Redirect, Route } from "react-router";
import { RESERVATIONS } from "./routes";

export default function UserRoute(props) {
  const { type, children, ...rest } = props;
  if (type === "user") return <Route {...rest}>{children}</Route>;
  return <Redirect to={RESERVATIONS} />;
}
