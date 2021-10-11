import { useState } from "react";
import { Button, Pane, TextInputField, toaster } from "evergreen-ui";
import { checkIfReservationExpired } from "../db/reservations";

export default function Check() {
  const [loading, setLoading] = useState(false);
  const [licensePlate, setLicensePlate] = useState("");

  const handleCheck = async () => {
    try {
      setLoading(true);

      if (!licensePlate) {
        toaster.warning("Please enter a license plate.");
        return;
      }

      const isReservationExpired = await checkIfReservationExpired(
        licensePlate
      );
      console.log("isReservationExpired", isReservationExpired);

      setLicensePlate("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Pane display="flex" flexDirection="column" gap={8} width={400}>
      <TextInputField
        id="license-plate"
        type="text"
        required
        label="License plate"
        placeholder="Enter license plate"
        value={licensePlate}
        onChange={(e) => setLicensePlate(e.target.value)}
        marginBottom={0}
      />

      <Button
        isLoading={loading}
        onClick={(e) => {
          e.preventDefault();
          handleCheck();
        }}
      >
        Check
      </Button>
    </Pane>
  );
}
