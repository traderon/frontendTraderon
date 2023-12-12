import React from "react";
import { Link } from "react-router-dom";

import PageContainer from "./container/PageContainer";

import AppbarFree from "./common/AppbarFree";
import Footer from "./common/footer";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

export default function Landing() {
  return (
    <PageContainer title="Homepage" description="this is Home page">
      <AppbarFree />
      <Box
        sx={{
          flexGrow: 1,
          margin: { xs: 2, sm: 5, md: 10, lg: 15 },
        }}
      >
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={12} md={6}>
            <img src="/image/landing_1.png" alt="bg" width="100%" />
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems={{
                xs: "center",
                sm: "center",
                md: "flex-start",
              }}
            >
              <Typography
                variant="h3"
                textAlign={{
                  xs: "center",
                  sm: "center",
                  md: "left",
                }}
                fontSize={{ xs: 30, sm: 40, md: 40, lg: 50 }}
              >
                <b>
                  The trading journal that will help improve your trading
                  performance.
                </b>
              </Typography>
              <Typography
                variant="h6"
                mt={3}
                textAlign={{
                  xs: "center",
                  sm: "center",
                  md: "left",
                  lg: "left",
                }}
              >
                <q>
                  <i>
                    SMB traders rely on Tradervue for journaling and performance
                    analysis.
                  </i>
                </q>
                <br />
                Mike Bellafiore, SMB Capital
              </Typography>
              <Button
                variant="contained"
                size="large"
                sx={{ mt: 4, bgcolor: "#0094b6" }}
                component={Link}
                to="/register"
              >
                Sign Up Now
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                textAlign: "center",
                color: "white",
                bgcolor: "#0094b6",
                p: 5,
                mt: 10,
              }}
            >
              <Typography variant="h6">
                Trade with a firm? Take a look at{" "}
                <Link style={{ color: "white" }}>
                  Traderon for trading firms.
                </Link>
              </Typography>
            </Paper>
          </Grid>
          <Stack
            mt={10}
            direction={{ sm: "column", lg: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Paper
              elevation={5}
              sx={{
                textAlign: "center",
                color: "black",
                bgcolor: "white",
                padding: 5,
                maxWidth: 300,
              }}
            >
              <img src="/image/small_1.png" alt="Journal" width="30%" />
              <Typography variant="h4" mb={5} mt={2}>
                Journal
              </Typography>
              <Typography variant="subtitle1" mb={2}>
                A stock, futures, and forex trading journal that works for you,
                not against you.
              </Typography>
              <Typography
                component={Link}
                to="#"
                sx={{
                  textDecoration: "none",
                  color: "#0094b6",
                }}
              >
                Learn more about the trading journal
              </Typography>
            </Paper>
            <Paper
              elevation={5}
              sx={{
                textAlign: "center",
                color: "black",
                bgcolor: "white",
                padding: 5,
                maxWidth: 300,
              }}
            >
              <img src="/image/small_1.png" alt="Analyze" width="30%" />
              <Typography variant="h4" mb={5} mt={2}>
                Analyze
              </Typography>
              <Typography variant="subtitle1" mb={2}>
                You&apos;ve been trading a lot. But do you really know
                what&apos;s working?
              </Typography>
              <Typography
                component={Link}
                to="#"
                sx={{
                  textDecoration: "none",
                  color: "#0094b6",
                }}
              >
                Learn more about our trading analysis software
              </Typography>
            </Paper>
            <Paper
              elevation={5}
              sx={{
                textAlign: "center",
                color: "black",
                bgcolor: "white",
                padding: 5,
                maxWidth: 300,
              }}
            >
              <img src="/image/small_1.png" alt="Share" width="30%" />
              <Typography variant="h4" mb={5} mt={2}>
                Share
              </Typography>
              <Typography variant="subtitle1" mb={2}>
                Execution is everything. Share your expertise with the trading
                community.
              </Typography>
              <Typography
                component={Link}
                to="#"
                sx={{
                  textDecoration: "none",
                  color: "#0094b6",
                }}
              >
                Learn more about our trading community
              </Typography>
            </Paper>
          </Stack>
        </Grid>
      </Box>
      <Footer />
    </PageContainer>
  );
}
