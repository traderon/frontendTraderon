import React, { useState, useEffect } from "react";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Stack from "@mui/material/Stack";

import MainLayout from "../../layouts/full/mainlayout";
import CheckoutForm from "./CheckoutForm";

import CONFIG from "../../config/config";

export default function PaymentPagePremium() {
  const [clientSecret, setClientSecret] = useState("");
  const [posted, setPosted] = useState(false);
  const stripePromise = loadStripe(CONFIG.STRIPE_KEY);
  const loadData = async () => {
    const payload = { price: "4995" };
    await axios
      .post("/create-payment-intent", payload)
      .then((res) => {
        setClientSecret(res.data.clientSecret);
        setPosted(true);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <MainLayout title="Payment">
      <Stack
        height="70vh"
        width="100%"
        alignItems="center"
        justifyContent="center"
      >
        {posted && (
          <Elements stripe={stripePromise} options={clientSecret}>
            <CheckoutForm clientSecret={clientSecret} membership="premium" />
          </Elements>
        )}
      </Stack>
    </MainLayout>
  );
}
