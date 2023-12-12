import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import "./customSwal.css";

import { updatePayment } from "../../actions/authActions";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";

export default function CheckoutForm({ clientSecret, membership }) {
  const stripe = useStripe();
  const elements = useElements();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((store) => store.auth.user.email);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      enqueueSnackbar(error.type, {
        variant: "error",
      });
    } else {
      // Confirm the payment on the client-side
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: paymentMethod.id,
        }
      );

      if (error) {
        enqueueSnackbar(error.type, { variant: "error" });
      } else {
        if (paymentIntent.status === "succeeded") {
          // enqueueSnackbar("Payment Succeed", { variant: "success" });
          swal({
            // title: "Congratulations!",
            text: "You've paid successfully, now you can import your trades.",
            button: {
              text: "OK",
              className: "swal-button",
            },
            icon: "success",
            className: "swal-text",
          });
          dispatch(updatePayment(email, membership, navigate));
        } else {
          enqueueSnackbar(paymentIntent.status, { variant: "warning" });
        }
      }
    }
    setIsLoading(false);
  };

  return (
    <Card sx={{ p: 3 }}>
      <Stack width={{ xs: 350, md: 500 }} spacing={5} mt={1}>
        <Typography align="center" variant="h5" color="#0094b6">
          Credit Card Details
        </Typography>
        <CardElement />
        <Stack direction="row" spacing={1} justifyContent="flex-end">
          <Button
            variant="outlined"
            onClick={() => navigate("/profile/account_plan")}
          >
            Not now
          </Button>
          <Button
            disabled={isLoading || !stripe || !elements}
            variant="contained"
            onClick={handleSubmit}
          >
            Pay now
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
