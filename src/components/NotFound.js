import React from "react";
import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Stack
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <img src="/image/404.png" alt="Share" width="350px" />
      <Typography variant="h3" mb={5} color="#0094b6">
        Page Not Found
      </Typography>
      <Button
        variant="contained"
        onClick={() => navigate("/tradestable")}
        sx={{ bgcolor: "#0094b6", mb: 5 }}
      >
        Back to Table
      </Button>
    </Stack>
  );
}
