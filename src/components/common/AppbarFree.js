import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  AppBar,
  styled,
  Stack,
  Button,
  Toolbar,
  Typography,
} from "@mui/material";

import { ReactComponent as LogoFull } from "../../assets/logo/templogoshort.svg";

export default function AppbarFree() {
  const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "1px 1px 5px grey",
    background: "#0094b6",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
      minHeight: "70px",
    },
  }));

  const ToolBarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    maxWidth: "90vW",
    color: theme.palette.text.secondary,
  }));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolBarStyled>
        <LogoFull height={20} />
        <Typography variant="h5" color="white" ml={1}>
          Traderon
        </Typography>
        <Box flexGrow={1} />
        <Stack
          spacing={5}
          direction="row"
          alignItems="center"
          display={{ xs: "none", sm: "none", md: "inherit", lg: "inherit" }}
        >
          <Typography
            variant="h6"
            component={Link}
            to="#"
            sx={{
              textDecoration: "none",
              color: "white",
            }}
          >
            Features
          </Typography>
          <Typography
            variant="h6"
            component={Link}
            to="#"
            sx={{
              textDecoration: "none",
              color: "white",
            }}
          >
            Pricing
          </Typography>
          <Typography
            variant="h6"
            component={Link}
            to="#"
            sx={{
              textDecoration: "none",
              color: "white",
            }}
          >
            Community
          </Typography>
          <Typography
            variant="h6"
            component={Link}
            to="#"
            sx={{
              textDecoration: "none",
              color: "white",
            }}
          >
            Help
          </Typography>
        </Stack>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Button
            variant="outlined"
            color="secondary"
            component={Link}
            to="/login"
            sx={{
              bgcolor: "#0094b6",
              color: "white",
              borderColor: "white",
              borderWidth: 2,
            }}
          >
            Sign In
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            component={Link}
            to="/register"
            sx={{
              bgcolor: "#0094b6",
              color: "white",
              borderColor: "white",
              borderWidth: 2,
            }}
          >
            Sign Up
          </Button>
        </Stack>
      </ToolBarStyled>
    </AppBarStyled>
  );
}
