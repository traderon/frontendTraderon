import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import {
  Grid,
  Box,
  Card,
  Stack,
  Typography,
  Button,
  TextField,
} from "@mui/material";

import { loginUser } from "../../actions/authActions";
import { CLEAR_ERRORS } from "../../actions/types";
// components
import PageContainer from "../container/PageContainer";
import Logo from "../../layouts/full/shared/logo/Logo";
import isEmpty from "../../validation/isEmpty";

const validate = (values) => {
  let errors = {};
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!regex.test(values.email)) {
    errors.email = "Invalid email format";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be more than 6 characters";
  }
  return errors;
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const check = useSelector((store) => store.errors);
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      const user = { email, password };
      dispatch(loginUser(user, navigate, enqueueSnackbar));
    } else {
      setIsSubmitting(false);
    }
  }, [
    errors,
    dispatch,
    email,
    isSubmitting,
    password,
    navigate,
    enqueueSnackbar,
  ]);

  useEffect(() => {
    setErrors({ email: check.email, password: check.password });
  }, [check]);

  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
            >
              <Box
                mt={3}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Logo />
              </Box>
              <Typography
                variant="subtitle1"
                textAlign="center"
                color="textSecondary"
                mb={2}
              >
                Your Social Campaigns
              </Typography>
              <Stack spacing={2}>
                <TextField
                  id="email"
                  label="Email"
                  placeholder="example@email.com"
                  variant="standard"
                  fullWidth
                  value={email}
                  onChange={(e) => {
                    setErrors({ ...errors, email: null });
                    setEmail(e.target.value);
                  }}
                  error={!isEmpty(errors.email)}
                  helperText={errors.email ? errors.email : null}
                />
                <TextField
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="Your Password"
                  variant="standard"
                  fullWidth
                  value={password}
                  onChange={(e) => {
                    setErrors({ ...errors, password: null });
                    setPassword(e.target.value);
                  }}
                  error={!isEmpty(errors.password)}
                  helperText={errors.password ? errors.password : null}
                />
                {/* <Stack
                  justifyContent="space-between"
                  direction="row"
                  alignItems="center"
                  my={2}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={<Checkbox defaultChecked />}
                      label="Remeber me"
                    />
                  </FormGroup>
                  <Typography
                    component={Link}
                    to="/passwordrecovery"
                    fontWeight="500"
                    sx={{
                      textDecoration: "none",
                      color: "primary.main",
                    }}
                  >
                    Forgot Password ?
                  </Typography>
                </Stack> */}
              </Stack>
              <Box mt={5}>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  fullWidth
                  component={Link}
                  to="/dashboard"
                  onClick={(e) => {
                    e.preventDefault();
                    setErrors(
                      validate({
                        email,
                        password,
                      })
                    );
                    setIsSubmitting(true);
                  }}
                  sx={{ bgcolor: "#0094b6" }}
                >
                  Sign In
                </Button>
              </Box>

              <Stack direction="row" spacing={2} justifyContent="center" mt={5}>
                <Typography
                  color="textSecondary"
                  variant="body1"
                  fontWeight="500"
                >
                  New to Traderon?
                </Typography>
                <Typography
                  component={Link}
                  to="/register"
                  fontWeight="500"
                  sx={{
                    textDecoration: "none",
                    color: "#0094b6",
                  }}
                  onClick={() => {
                    dispatch({ type: CLEAR_ERRORS, payload: {} });
                  }}
                >
                  Create an account
                </Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login;
