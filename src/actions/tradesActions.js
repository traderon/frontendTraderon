import axios from "axios";
import { TRADES_LOADING, GET_TRADES, CLEAR_ERRORS } from "./types";

export const getTradesData =
  (parameters, navigate, enqueueSnackbar) => (dispatch) => {
    dispatch(setTradesLoading());
    axios
      .post("/api/import_trades", parameters)
      .then((res) => {
        enqueueSnackbar("Successfully imported", {
          variant: "success",
        });
        dispatch({ type: CLEAR_ERRORS });
        dispatch(
          getTradesFromDatabase({ user: parameters.user }, enqueueSnackbar)
        );
        navigate("/tradestable");
      })
      .catch((err) => {
        enqueueSnackbar("Can't import data", {
          variant: "error",
        });
        dispatch({ type: CLEAR_ERRORS });
        dispatch(
          getTradesFromDatabase({ user: parameters.user }, enqueueSnackbar)
        );
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

export const deleteTrades =
  (userId, tradeId, enqueueSnackbar, trades) => (dispatch) => {
    if (userId) {
      console.log(trades);
      dispatch(setTradesLoading());
      axios
        .post("/api/delete_trades", { userId, tradeId })
        .then(() => {
          enqueueSnackbar(`Deleted ${tradeId.length} trades`, {
            variant: "success",
          });
          dispatch({
            type: GET_TRADES,
            payload: trades.filter((trade) => !tradeId.includes(trade.id)),
          });
        })
        .catch(() => {
          enqueueSnackbar("Error occured", { variant: "error" });
        });
    }
  };
