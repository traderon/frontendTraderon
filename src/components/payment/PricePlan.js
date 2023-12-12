import React from "react";
import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";

import MainLayout from "../../layouts/full/mainlayout";

const plans = [
  {
    title: "pro",
    price: 29.95,
    features: [
      "All Basic plan features",
      "Stocks, Options, Forex, Futures",
      "Private Profile",
      "Import Trades",
      "Basic Reports",
    ],
  },
  {
    title: "premium",
    price: 49.95,
    features: [
      "All Pro plan features",
      "Pre and Post Market Chart Data",
      "Commissions and Fee Tracking",
      "Running PnL",
      "Best Exit Reports",
      "Evaluator Report",
      "Simulator Report",
      "R Multiple Report",
      "MFE/MAE Statistics",
    ],
  },
  {
    title: "elite",
    price: 79.95,
    features: [
      "All Premium plan features",
      "AI Feedback",
      "Track Targets and Stop Losses",
      "Trade Management",
      "Automatic Spread Detection",
      "Spread Report",
      "Stock Market Replay",
    ],
  },
];

export default function PricePlan() {
  const navigate = useNavigate();

  return (
    <MainLayout title="Account Plan">
      <Stack width="100%" p={{ xs: 1, md: 3 }} alignItems="center" spacing={4}>
        <Typography variant="h4" align="center">
          Select Your Account Plan
        </Typography>
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems="flex-start"
          justifyContent="center"
          spacing={3}
        >
          {plans.map((plan, index) => (
            <Card key={index} sx={{ maxWidth: 350 }}>
              <CardHeader
                title={plan.title.toUpperCase()}
                sx={{ bgcolor: "#0094b6" }}
                titleTypographyProps={{
                  typography: "h4",
                  color: "white",
                  align: "center",
                }}
              />
              <Stack
                direction="row"
                spacing={0.5}
                justifyContent="center"
                mb={2}
                mt={5}
              >
                <Typography variant="h5">$</Typography>
                <Typography variant="h2" color="#0094b6">
                  {plan.price}
                </Typography>
                <Typography pt={4.5} color="text.disabled">
                  /month
                </Typography>
              </Stack>
              <Stack spacing={0.5} alignItems="center" p={3}>
                {plan.features.map((feature, i) => (
                  <Typography key={i} align="center">
                    {feature}
                  </Typography>
                ))}
              </Stack>
              <Stack alignItems="center" p={5}>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#0094b6" }}
                  onClick={() => navigate(`/payment-${plan.title}`)}
                >
                  Select Plan
                </Button>
              </Stack>
            </Card>
          ))}
        </Stack>
      </Stack>
    </MainLayout>
  );
}
