import { Button } from "evergreen-ui";
import { Link } from "react-router-dom";
import { ACCOUNT, HOME, RESERVATIONS } from "../routes";

export default function SideNav() {
  return (
    <nav>
      <Link to={HOME}>
        <Button>Book</Button>
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
