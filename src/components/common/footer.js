import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

import { ReactComponent as LogoFull } from "../../assets/logo/templogo2.svg";

export default function Footer() {
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "black",
        color: "white",
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 5,
        paddingBottom: 5,
        mt: 10,
      }}
      alignItems="center"
    >
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="flex-startr"
      >
        <Grid item xs={12} lg={6}>
          <LogoFull height={30} />
          <Typography mt={5}>
            Copyright &copy; {new Date().getFullYear()} Traderon, All Rights
            Reserved
          </Typography>
        </Grid>
        <Grid item xs={6} lg={3}>
          <Typography variant="h6" mb={3}>
            Company
          </Typography>
          <Typography mb={1}>About</Typography>
          <Typography mb={1}>Terms of Service</Typography>
          <Typography mb={1}>Privacy Policy</Typography>
          <Typography mb={1}>Affiliates</Typography>
          <Typography mb={1}>Academy</Typography>
          <Typography mb={1}>Careers</Typography>
        </Grid>
        <Grid item xs={6} lg={3}>
          <Typography variant="h6" mb={3}>
            Connect
          </Typography>
          <Typography mb={1}>Contact Us</Typography>
          <Typography mb={1}>Platforms</Typography>
          <Typography mb={1}>Help</Typography>
          <Typography variant="h6" mb={3} mt={5}>
            Follow
          </Typography>
          <Typography mb={1}>Twitter</Typography>
          <Typography mb={1}>StockTwits</Typography>
          <Typography mb={1}>Blog</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
