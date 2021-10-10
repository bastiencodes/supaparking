import { Button } from "evergreen-ui";
import { Link } from "react-router-dom";
import { ACCOUNT, PAY, RESERVATIONS } from "../routes";

export default function SideNav() {
  return (
    <nav>
      <Link to={PAY}>
        <Button>Pay</Button>
      </Link>
      <Link to={RESERVATIONS}>
        <Button>Reservations</Button>
      </Link>
      <Link to={ACCOUNT}>
        <Button>Account</Button>
      </Link>
    </nav>
  );
}
