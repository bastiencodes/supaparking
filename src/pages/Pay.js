import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Heading,
  Strong,
  TextInputField,
  toaster,
} from "evergreen-ui";
import { format, addMinutes } from "date-fns";

const INITIAL_DATE = new Date();

export default function Pay() {
  const INITIAL_COUNT = 1;

  const [loading, setLoading] = useState(false);
  const [licensePlate, setLicensePlate] = useState("");
  const [count, setCount] = useState(INITIAL_COUNT);
  const [expiry, setExpiry] = useState(INITIAL_DATE);

  const handlePay = async () => {
    try {
      setLoading(true);

      if (!licensePlate) {
        toaster.warning("Please enter a license plate.");
        return;
      }

      // const { error } = await supabase.auth.signIn({ email });
      // if (error) throw error;

      console.log({ licensePlate, expiry: expiry.toISOString() });

      toaster.success("You have paid for the parking spot.");
      setLicensePlate("");
      setCount(INITIAL_COUNT);
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) =>
    `Park until ${format(date, "HH:mm (dd/MM/yyyy)")}`;

  const formatTime = () => `in ${5 * count} minutes`;

  const refreshCount = () => setCount(INITIAL_COUNT);

  const decrementCount = () => {
    if (count > INITIAL_COUNT) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => setCount(count + 1);

  useEffect(() => {
    const updateDate = () => {
      const updatedDate = addMinutes(INITIAL_DATE, count * 5);
      setExpiry(updatedDate);
    };

    updateDate();
  }, [count]);

  return (
    <Card
      backgroundColor="#F3F6FF"
      elevation={1}
      borderRadius={4}
      marginX={16}
      padding={24}
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={24}
    >
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

      <Strong>{formatDate(expiry)}</Strong>

      <Card display="flex" gap="10px">
        <Button onClick={() => refreshCount()}>🔄</Button>
        <Button onClick={() => decrementCount()}>➖</Button>
        <Heading size={800}>{formatTime(count)}</Heading>
        <Button onClick={() => incrementCount()}>➕</Button>
      </Card>

      <Button
        height={48}
        isLoading={loading}
        onClick={(e) => {
          e.preventDefault();
          handlePay();
        }}
        gap={8}
      >
        Pay
        <span>🤑</span>
      </Button>
    </Card>
  );
}
