import { Chip } from "@mui/material";

export default function ConnectionStatus({ status }: { status: string }) {
  return (
    <Chip
      label={status}
      color={
        status === "CONNECTED"
          ? "success"
          : status === "CONNECTING"
            ? "warning"
            : "error"
      }
    />
  );
}