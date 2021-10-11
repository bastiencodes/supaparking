import { useEffect, useState } from "react";
import { Pane, Table } from "evergreen-ui";
import { format, formatDistanceStrict, formatDistanceToNow } from "date-fns";
import {
  getCurrentReservations,
  getPastReservations,
} from "../db/reservations";

export default function Reservations() {
  const [past, setPast] = useState([]);
  const [current, setCurrent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: past } = await getPastReservations();
      setPast(past);

      const { data: current } = await getCurrentReservations();
      setCurrent(current);
    };

    fetchData();
  }, []);
  return (
    <Pane paddingX={16}>
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Plate</Table.TextHeaderCell>
          <Table.TextHeaderCell>Remaining time</Table.TextHeaderCell>
          <Table.TextHeaderCell>Expires</Table.TextHeaderCell>
        </Table.Head>

        <Table.Body height={240}>
          {current.map((item) => (
            <Table.Row key={item.id}>
              <Table.TextCell>{item.license_plate}</Table.TextCell>
              <Table.TextCell>
                {formatDistanceToNow(new Date(item.expiry), {
                  addSuffix: true,
                })}
              </Table.TextCell>
              <Table.TextCell>
                {format(new Date(item.expiry), "dd/MM/yyyy HH:mm")}
              </Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Table>
        <Table.Head>
          <Table.TextHeaderCell>Plate</Table.TextHeaderCell>
          <Table.TextHeaderCell>Duration</Table.TextHeaderCell>
          <Table.TextHeaderCell>Start</Table.TextHeaderCell>
          <Table.TextHeaderCell>End</Table.TextHeaderCell>
        </Table.Head>

        <Table.Body height={240}>
          {past.map((item) => (
            <Table.Row key={item.id}>
              <Table.TextCell>{item.license_plate}</Table.TextCell>
              <Table.TextCell>
                {formatDistanceStrict(
                  new Date(item.created_at),
                  new Date(item.expiry),
                  {
                    roundingMethod: "ceil",
                  }
                )}
              </Table.TextCell>
              <Table.TextCell>
                {format(new Date(item.created_at), "dd/MM/yyyy HH:mm")}
              </Table.TextCell>
              <Table.TextCell>
                {format(new Date(item.expiry), "dd/MM/yyyy HH:mm")}
              </Table.TextCell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Pane>
  );
}
