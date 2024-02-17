import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import swal from "sweetalert";
import "./customSwal.css";
// action
import { updatePayment } from "../../actions/authActions";
// config
import CONFIG from "../../config/config";
// mui
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
//
import MainLayout from "../../layouts/full/mainlayout";

export default function PayPalCheckout() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((store) => store.auth.user.email);

  const [orderID, setOrderID] = useState(false);
  const [success, setSuccess] = useState(false);

  // creates a paypal order
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: params.membership,
            amount: {
              currency_code: "USD",
              value:
                params.membership === ":pro"
                  ? 29.95
                  : params.membership === ":premium"
                  ? 49.95
                  : 79.95,
            },
          },
        ],
      })
      .then((orderID) => {
        setOrderID(orderID);
        return orderID;
      });
  };
  // check Approval
  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;
      // console.log(payer);
      setSuccess(true);
    });
  };
  useEffect(() => {
    if (success) {
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
      dispatch(updatePayment(email, params.membership.substring(1), navigate));
    }
  }, [success]);

  return (
    <PayPalScriptProvider options={{ clientId: CONFIG.CLIENT_ID }}>
      <MainLayout>
        <Stack
          width="100%"
          alignItems="center"
          justifyContent="center"
          mt={{ xs: 5, md: 10 }}
          mb={3}
        >
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="center"
            mb={5}
          >
            <IconButton
              sx={{ color: "#0094b6", display: { xs: "none", md: "inherit" } }}
              onClick={() => navigate("/profile/account_plan")}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <Typography align="center" variant="h4" color="#0094b6">
              Confirm your payment
            </Typography>
          </Stack>
          <Stack width={{ xs: 300, md: 500 }}>
            <PayPalButtons
              style={{ layout: "vertical" }}
              createOrder={createOrder}
              onApprove={onApprove}
            />
            <Button
              variant="contained"
              sx={{ boxShadow: "none", display: { xs: "block", md: "none" } }}
              fullWidth
              onClick={() => navigate("/profile/account_plan")}
            >
              Not now
            </Button>
          </Stack>
        </Stack>
      </MainLayout>
    </PayPalScriptProvider>
  );
}
