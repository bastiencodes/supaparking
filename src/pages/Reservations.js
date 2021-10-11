import { useEffect, useState } from "react";
import { Pane, Table } from "evergreen-ui";
import { formatDistanceToNow } from "date-fns";
import { getReservations } from "../db/reservations";

export default function Reservations() {
  const [reservations, setReservations] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getReservations();
      setReservations(data);
    };

    fetchData();
  }, []);
  return (
    <Pane paddingX={16}>
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Plate</Table.TextHeaderCell>
          <Table.TextHeaderCell>Remaining time</Table.TextHeaderCell>
          <Table.TextHeaderCell>Expiry</Table.TextHeaderCell>
        </Table.Head>
        <Table.Body height={240}>
          {reservations.map((item) => (
            <Table.Row key={item.id}>
              <Table.TextCell>{item.license_plate}</Table.TextCell>
              <Table.TextCell>
                {formatDistanceToNow(new Date(item.expiry), {
                  addSuffix: true,
                })}
              </Table.TextCell>
              <Table.TextCell>{item.expiry}</Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Pane>
  );
}
