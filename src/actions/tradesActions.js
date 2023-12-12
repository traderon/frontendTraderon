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
    let url, headers;
    dispatch(setTradesLoading());
    switch (brokerName) {
      case "Oanda":
        url = `https://api-fxtrade.oanda.com/v3/accounts/${accountId}//trades?state=CLOSED&count=${
          dataRange === "Latest Trades" ? 100 : 500
        }`;
        headers = {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        };
        break;
      default:
        url = null;
        headers = null;
    }
    axios
      .get(url, { headers })
      .then((res) => {
        const tdata = res.data.trades;
        const tradeData = tdata.map((trade) => {
          return {
            account_id: accountId,
            broker: brokerName,
            trade_id: trade.id,
            status: parseFloat(trade.realizedPL) > 0 ? "WIN" : "LOSS",
            open_date: trade.openTime,
            symbol: trade.instrument,
            entry: trade.price,
            exit: trade.averageClosePrice,
            size: trade.initialUnits,
            ret: trade.realizedPL,
            side:
              trade.takeProfitOrder === undefined
                ? "UNKNOWN"
                : parseFloat(trade.price) >
                  parseFloat(trade.takeProfitOrder.price)
                ? "SHORT"
                : "LONG",
            setups: trade.setups === undefined ? "" : trade.setups,
            mistakes: "",
            sub_1: {
              action:
                trade.takeProfitOrder === undefined
                  ? "UNKNOWN"
                  : parseFloat(trade.price) >
                    parseFloat(trade.takeProfitOrder.price)
                  ? "Sell"
                  : "Buy",
              spread: "SINGLE",
              type: "FOREX",
              date: trade.openTime,
              size: Math.abs(parseFloat(trade.initialUnits)).toString(),
              position: trade.initialUnits,
              price: trade.price,
            },
            sub_2: {
              action:
                trade.takeProfitOrder === undefined
                  ? "UNKNOWN"
                  : parseFloat(trade.price) >
                    parseFloat(trade.takeProfitOrder.price)
                  ? "Buy"
                  : "Sell",
              spread: "SINGLE",
              type: "FOREX",
              date: trade.stopLossOrder
                ? trade.stopLossOrder.filledTime
                  ? trade.stopLossOrder.filledTime
                  : trade.stopLossOrder.cancelledTime
                : "asdf",
              size: trade.initialUnits,
              position: trade.initialUnits,
              price: trade.stopLossOrder
                ? trade.stopLossOrder.price
                : "no stoploss",
            },
          };
        });
        enqueueSnackbar("Successfully imported", {
          variant: "success",
        });
        dispatch(
          setTradesToDatabase(
            { user: userId, trades: tradeData },
            navigate,
            enqueueSnackbar
          )
        );
      })
      .catch((err) => {
        enqueueSnackbar("Can't import data", {
          variant: "error",
        });
        console.log(err);
      });
  };

export const setTradesToDatabase =
  (tradeData, navigate, enqueueSnackbar) => (dispatch) => {
    axios
      .post("/api/trades", tradeData)
      .then((res) => {
        dispatch({ type: CLEAR_ERRORS });
        dispatch(
          getTradesFromDatabase({ user: tradeData.user }, enqueueSnackbar)
        );
        navigate("/tradestable");
      })
      .catch((err) => {
        enqueueSnackbar("Fail to save trades", {
          variant: "error",
        });
        dispatch({ type: GET_TRADES, payload: null });
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
