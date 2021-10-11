import { Button } from "evergreen-ui";
import { Link } from "react-router-dom";
import { ACCOUNT, CHECK, PAY, RESERVATIONS } from "../routes/routes";

export default function SideNav({ type }) {
  return (
    <nav>
      {type === "user" ? (
        <Link to={PAY}>
          <Button>Pay</Button>
        </Link>
      ) : null}
      {type === "admin" ? (
        <Link to={CHECK}>
          <Button>Check</Button>
        </Link>
      ) : null}
      <Link to={RESERVATIONS}>
        <Button>Reservations</Button>
      </Link>
      <Link to={ACCOUNT}>
        <Button>Account</Button>
      </Link>
    </nav>
  );
}
