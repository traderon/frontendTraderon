import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, CLEAR_ERRORS, SET_CURRENT_USER } from "./types";

// Register
export const registerUser =
  (userData, navigate, enqueueSnackbar) => (dispatch) => {
    axios
      .post("/api/user/register", userData)
      .then((res) => {
        enqueueSnackbar("You have registered successfully", {
          variant: "success",
        });
        dispatch({ type: CLEAR_ERRORS, payload: {} });
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
        navigate("/tradestable");
      })
      .catch((err) =>
        dispatch({ type: GET_ERRORS, payload: err.response.data })
      );
  };

// Login & Get user token
export const loginUser =
  (userData, navigate, enqueueSnackbar) => (dispatch) => {
    axios
      .post("/api/user/login", userData)
      .then((res) => {
        dispatch({ type: CLEAR_ERRORS, payload: {} });
        const { token } = res.data;
        localStorage.setItem("jwtToken", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
        enqueueSnackbar("You have logged in successfully", {
          variant: "success",
        });
        navigate("/tradestable");
      })
      .catch((err) => {
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        });
      });
  };

// Set current user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// Logout
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  window.location.href = "/login";
};

// UPDATE membership, paydate
export const updatePayment = (email, membership, navigate) => (dispatch) => {
  axios
    .post("/api/payment-success", { email, membership })
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      navigate("/tradestable");
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};
