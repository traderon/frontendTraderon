import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Box,
  Card,
  Stack,
  Typography,
  Button,
  TextField,
} from "@mui/material";

// components
import PageContainer from "../container/PageContainer";
import Logo from "../../layouts/full/shared/logo/Logo";
import isEmpty from "../../validation/isEmpty";

import { registerUser } from "../../actions/authActions";

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
  if (!values.password2) {
    errors.password2 = "Confirm password is required";
  } else if (values.password !== values.password2) {
    errors.password2 = "Passwords must match";
  }
  if (!values.firstname) {
    errors.firstname = "Firstname is required";
  }
  if (!values.lastname) {
    errors.lastname = "Lastname is required";
  }
  return errors;
};

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({
    firstname: null,
    lastname: null,
    email: null,
    password: null,
    password2: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      const newUser = { firstname, lastname, email, password };
      dispatch(registerUser(newUser, navigate, enqueueSnackbar));
    } else {
      setIsSubmitting(false);
    }
  }, [
    errors,
    dispatch,
    email,
    firstname,
    isSubmitting,
    lastname,
    password,
    navigate,
    enqueueSnackbar,
  ]);

  const check = useSelector((store) => store.errors);
  useEffect(() => {
    setErrors({ email: check.email });
  }, [check]);

  return (
    <PageContainer title="Register" description="this is Register page">
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
              <Stack direction="column" spacing={2}>
                <Stack direction="row" spacing={1}>
                  <TextField
                    id="firstname"
                    label="Firstname"
                    placeholder="Your firstname"
                    variant="standard"
                    value={firstname}
                    onChange={(e) => {
                      setErrors({ ...errors, firstname: null });
                      setFirstname(e.target.value);
                    }}
                    error={!isEmpty(errors.firstname)}
                    helperText={errors.firstname ? errors.firstname : null}
                    fullWidth
                  />
                  <TextField
                    id="lastname"
                    label="Lastname"
                    placeholder="Your lastname"
                    variant="standard"
                    fullWidth
                    value={lastname}
                    onChange={(e) => {
                      setErrors({ ...errors, lastname: null });
                      setLastname(e.target.value);
                    }}
                    error={!isEmpty(errors.lastname)}
                    helperText={errors.lastname ? errors.lastname : null}
                  />
                </Stack>
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
                <TextField
                  id="password2"
                  type="password"
                  label="Confirm password"
                  placeholder="Confirm Password"
                  variant="standard"
                  fullWidth
                  value={password2}
                  onChange={(e) => {
                    setErrors({ ...errors, password2: null });
                    setPassword2(e.target.value);
                  }}
                  error={!isEmpty(errors.password2)}
                  helperText={errors.password2 ? errors.password2 : null}
                />
              </Stack>
              <Box mt={5}>
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  disabled={isSubmitting}
                  onClick={(e) => {
                    e.preventDefault();
                    setErrors(
                      validate({
                        firstname,
                        lastname,
                        email,
                        password,
                        password2,
                      })
                    );
                    setIsSubmitting(true);
                  }}
                  sx={{ bgcolor: "#0094b6" }}
                >
                  Sign Up
                </Button>
              </Box>

              <Stack direction="row" spacing={2} justifyContent="center" mt={5}>
                <Typography
                  color="textSecondary"
                  variant="body1"
                  fontWeight="500"
                >
                  Already have an Account?
                </Typography>
                <Typography
                  component={Link}
                  to="/login"
                  fontWeight="500"
                  sx={{
                    textDecoration: "none",
                    color: "#0094b6",
                  }}
                >
                  Sign In
                </Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Register;
