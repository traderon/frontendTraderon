import axios from "axios";
import { TRADES_LOADING, GET_TRADES, CLEAR_ERRORS } from "./types";

export const getTradesData =
  (
    userId,
    accountId,
    accessToken,
    dataRange,
    timezone,
    brokerName,
    navigate,
    enqueueSnackbar
  ) =>
  (dispatch) => {
    dispatch(setTradesLoading());
    axios
      .post("/api/import_trades", {
        broker: brokerName,
        key: accessToken,
        id: accountId,
        user: userId,
      })
      .then((res) => {
        enqueueSnackbar("Successfully imported", {
          variant: "success",
        });
        dispatch({ type: CLEAR_ERRORS });
        dispatch(getTradesFromDatabase({ user: userId }, enqueueSnackbar));
        navigate("/tradestable");
      })
      .catch((err) => {
        enqueueSnackbar("Can't import data", {
          variant: "error",
        });
        dispatch({ type: CLEAR_ERRORS });
        dispatch(getTradesFromDatabase({ user: userId }, enqueueSnackbar));
        navigate("/tradestable");
      });
  };

export const getTradesFromDatabase = (user, enqueueSnackbar) => (dispatch) => {
  if (user) {
    dispatch(setTradesLoading());
    axios
      .post("/api/get_trades", user)
      .then((res) => {
        dispatch({
          type: GET_TRADES,
          payload: res.data,
        });
        if (res.data.length > 0) {
          enqueueSnackbar(`Loaded ${res.data.length} trades successfully`, {
            variant: "success",
          });
        } else {
          enqueueSnackbar("No data to display", {
            variant: "warning",
          });
        }
      })
      .catch((err) => {
        enqueueSnackbar(`Fail to load trades`, {
          variant: "error",
        });
      });
  }
};

export const setTradesLoading = () => {
  return {
    type: TRADES_LOADING,
  };
};
