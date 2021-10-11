import { useState } from "react";
import { Button, TextInputField, toaster } from "evergreen-ui";
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
    <>
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
        height={48}
        isLoading={loading}
        onClick={(e) => {
          e.preventDefault();
          handleCheck();
        }}
      >
        Check
      </Button>
    </>
  );
}
