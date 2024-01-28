import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Chart from "react-apexcharts";
import axios from "axios";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import Spinner from "../common/Spinner";

function arrayFilter(array, max) {
  let newArray = [];
  for (let i = 0; i < array.length - 2; i += array.length / max) {
    newArray.push(array[parseInt(i)]);
  }
  newArray.push(array[array.length - 1]);
  return newArray;
}

export default function ReportsOverview({ selected }) {
  const expired = useSelector((store) => store.auth.user.expired);
  const userId = useSelector((store) => store.auth.user.public_id);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (expired) {
      navigate("/profile/account_plan");
      enqueueSnackbar("Your Account is Expired", {
        variant: "error",
      });
    }
  }, [expired, navigate, enqueueSnackbar]);

  const [isLoading, setIsLoading] = useState(false);
  const [optionColumnChart, setOptionColumnChart] = useState({
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        colors: {
          ranges: [
            {
              from: -100,
              to: -46,
              color: "#F15B46",
            },
            {
              from: -45,
              to: 0,
              color: "#FEB019",
            },
          ],
        },
        columnWidth: "80%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      labels: {
        formatter: function (y) {
          return (y / 1000).toFixed(1) + "k";
        },
      },
    },
    xaxis: {},
  });
  const [accumTotal, setAccumTotal] = useState(0);
  const [accumTotalChart, setAccumTotalChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [optionChart1, setOptionChart1] = useState({
    chart: {
      type: "area",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
    },
    stroke: {
      width: 1,
    },
    fill: {
      colors: "blue",
      type: "solid",
      opacity: 0.01,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (value) => value.toFixed(2),
      },
    },
    xaxis: {},
  });
  const [optionChart2, setOptionChart2] = useState({
    chart: {
      type: "area",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 60,
      sparkline: {
        enabled: true,
      },
      group: "sparklines",
    },
    stroke: {
      width: 1,
    },
    fill: {
      colors: "blue",
      type: "solid",
      opacity: 0.01,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (value) => value.toFixed(2),
      },
    },
    xaxis: {},
  });
  const [dailyReturnC, setDailyReturnC] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [returnOnWinnersTotal, setReturnOnWinnersTotal] = useState(0);
  const [returnOnWinnersChart, setReturnOnWinnersChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [returnOnLosersTotal, setReturnOnLosersTotal] = useState(0);
  const [returnOnLosersChart, setReturnOnLosersChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [returnLongTotal, setReturnLongTotal] = useState(0);
  const [returnLongChart, setReturnLongChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [returnShortTotal, setReturnShortTotal] = useState(0);
  const [returnShortChart, setReturnShortChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [biggestProfitT, setBiggestProfitT] = useState(0);
  const [biggestLoseT, setBiggestLoseT] = useState(0);
  const [winLoseRatio, setWinLoseRatio] = useState(1);
  const [closedTradesTotal, setClosedTradesTotal] = useState(0);
  const [closedTradesChart, setClosedTradesChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [openTradesTotal, setOpenTradesTotal] = useState(0);
  const [openTradesChart, setOpenTradesChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [allTradesTotal, setAllTradesTotal] = useState(0);
  const [allTradesChart, setAllTradesChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [avgNumTrades, setAvgNumTrades] = useState(0);
  const [totalWin, setTotalWin] = useState(0);
  const [totalLoss, setTotalLoss] = useState(0);
  const [totalWinChart, setTotalWinChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [totalLossChart, setTotalLossChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await axios
        .post("/api/get-reports", { userId, selected })
        .then((res) => {
          const {
            totalReturnY,
            totalReturnX,
            totalReturn,
            totalDates,
            dailyReturn,
            returnWin,
            returnWinTotal,
            returnLose,
            returnLoseTotal,
            returnLong,
            returnLongTotal,
            returnShort,
            returnShortTotal,
            biggestProfit,
            biggestLose,
            totalClosedTrades,
            closedTrades,
            totalOpenTrades,
            openTrades,
            totalTrades,
            dailyTrades,
            totalWinner,
            totalLoser,
            dailyWinners,
            dailyLosers,
          } = res.data;
          setAccumTotal(totalReturn);
          setAccumTotalChart({
            ...accumTotalChart,
            data:
              totalReturnY.length > 100
                ? arrayFilter(totalReturnY, 100)
                : totalReturnY,
          });
          setOptionColumnChart({
            ...optionColumnChart,
            xaxis: {
              categories:
                totalReturnX.length > 100
                  ? arrayFilter(totalReturnX, 100)
                  : totalReturnX,
            },
          });
          setOptionChart1({
            ...optionChart1,
            xaxis: {
              categories:
                totalReturnX.length > 100
                  ? arrayFilter(totalReturnX, 100)
                  : totalReturnX,
            },
          });
          setDailyReturnC({
            ...dailyReturnC,
            data:
              dailyReturn.length > 100
                ? arrayFilter(dailyReturn, 100)
                : dailyReturn,
          });
          setOptionChart2({
            ...optionChart2,
            xaxis: {
              categories:
                totalDates.length > 100
                  ? arrayFilter(totalDates, 100)
                  : totalDates,
            },
          });
          setReturnOnWinnersTotal(returnWinTotal);
          setReturnOnWinnersChart({
            ...returnOnWinnersChart,
            data:
              returnWin.length > 100 ? arrayFilter(returnWin, 100) : returnWin,
          });
          setReturnOnLosersTotal(returnLoseTotal);
          setReturnOnLosersChart({
            ...returnOnLosersChart,
            data:
              returnLose.length > 100
                ? arrayFilter(returnLose, 100)
                : returnLose,
          });
          setReturnLongTotal(returnLongTotal);
          setReturnLongChart({
            ...returnLongChart,
            data:
              returnLong.length > 100
                ? arrayFilter(returnLong, 100)
                : returnLong,
          });
          setReturnShortTotal(returnShortTotal);
          setReturnShortChart({
            ...returnShortChart,
            data:
              returnShort.length > 100
                ? arrayFilter(returnShort, 100)
                : returnShort,
          });
          setBiggestProfitT(biggestProfit);
          setBiggestLoseT(biggestLose);
          setWinLoseRatio(returnWin.length / returnLose.length);
          setClosedTradesTotal(totalClosedTrades);
          setAllTradesTotal(totalTrades);
          setOpenTradesTotal(totalOpenTrades);
          setClosedTradesChart({
            ...closedTradesChart,
            data:
              closedTrades.length > 100
                ? arrayFilter(closedTrades, 100)
                : closedTrades,
          });
          setAllTradesChart({
            ...allTradesChart,
            data:
              dailyTrades.length > 100
                ? arrayFilter(dailyTrades, 100)
                : dailyTrades,
          });
          setOpenTradesChart({
            ...openTradesChart,
            data:
              openTrades.length > 100
                ? arrayFilter(openTrades, 100)
                : openTrades,
          });
          setAvgNumTrades(totalTrades / totalDates.length);
          setTotalWin(totalWinner);
          setTotalWinChart({
            ...totalWinChart,
            data:
              dailyWinners.length > 100
                ? arrayFilter(dailyWinners, 100)
                : dailyWinners,
          });
          setTotalLoss(totalLoser);
          setTotalLossChart({
            ...totalLossChart,
            data:
              dailyLosers.length > 100
                ? arrayFilter(dailyLosers, 100)
                : dailyLosers,
          });
        })
        .catch((err) => console.log(err));
      setIsLoading(false);
    })();
  }, [selected]);

  return (
    <Stack>
      {isLoading ? (
        <Stack width="100%" justifyContent="center" alignItems="center">
          <Spinner />
        </Stack>
      ) : (
        <Grid container spacing={{ xs: 1, md: 2 }}>
          <Grid item xs={12}>
            <Paper sx={{ p: 1 }}>
              <Typography variant="subtitle1">Accumulative Return $</Typography>
              <Divider sx={{ mx: -1, my: 1 }} />
              <Chart
                options={optionColumnChart}
                series={[accumTotalChart]}
                type="bar"
                height={350}
              />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 1, mb: -1 }}>
              <b>Return $</b>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography>Accumulative Return $</Typography>
              <Typography variant="h5" mb={1}>
                <b>{accumTotal.toFixed(2)}</b>
              </Typography>
              <Chart
                options={optionChart1}
                series={[accumTotalChart]}
                type="area"
                height={50}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography>Accumulative Return Net $</Typography>
              <Typography variant="h5" mb={1}>
                <b>{accumTotal.toFixed(2)}</b>
              </Typography>
              <Chart
                options={optionChart1}
                series={[accumTotalChart]}
                type="area"
                height={50}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography>Accumulative Balance</Typography>
              <Typography variant="h5" mb={1}>
                <b>{accumTotal.toFixed(2)}</b>
              </Typography>
              <Chart
                options={optionChart1}
                series={[accumTotalChart]}
                type="area"
                height={50}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography>Daily Return $</Typography>
              <Typography variant="h5" mb={1}>
                <b>{accumTotal.toFixed(2)}</b>
              </Typography>
              <Chart
                options={optionChart2}
                series={[dailyReturnC]}
                type="area"
                height={50}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography>Return on Winners</Typography>
              <Typography variant="h5" mb={1}>
                <b>{returnOnWinnersTotal.toFixed(2)}</b>
              </Typography>
              <Chart
                options={optionChart1}
                series={[returnOnWinnersChart]}
                type="area"
                height={50}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography>Return on Losers</Typography>
              <Typography variant="h5" mb={1}>
                <b>{returnOnLosersTotal.toFixed(2)}</b>
              </Typography>
              <Chart
                options={optionChart1}
                series={[returnOnLosersChart]}
                type="area"
                height={50}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography>Return $ on Long</Typography>
              <Typography variant="h5" mb={1}>
                <b>{returnLongTotal.toFixed(2)}</b>
              </Typography>
              <Chart
                options={optionChart1}
                series={[returnLongChart]}
                type="area"
                height={50}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography>Return $ on Short</Typography>
              <Typography variant="h5" mb={1}>
                <b>{returnShortTotal.toFixed(2)}</b>
              </Typography>
              <Chart
                options={optionChart1}
                series={[returnShortChart]}
                type="area"
                height={50}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography>Biggest Profit $</Typography>
              <Typography variant="h5" mb={1}>
                <b>{biggestProfitT.toFixed(2)}</b>
              </Typography>
              <Chart
                options={optionChart1}
                series={[returnOnWinnersChart]}
                type="area"
                height={50}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography>Biggest Loss $</Typography>
              <Typography variant="h5" mb={1}>
                <b>{biggestLoseT.toFixed(2)}</b>
              </Typography>
              <Chart
                options={optionChart1}
                series={[returnOnLosersChart]}
                type="area"
                height={50}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography>Profit / Loss Ratio</Typography>
              <Typography variant="h5" mb={1}>
                <b>
                  {winLoseRatio.toFixed(2)}
                  :1
                </b>
              </Typography>
              <Stack height={50} />
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 1, mb: -1 }}>
              <b>Return %</b>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography>Win %</Typography>
              <Typography variant="h5" mb={1}>
                <b>{((winLoseRatio * 100) / (winLoseRatio + 1)).toFixed(2)}</b>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography>Loss %</Typography>
              <Typography variant="h5" mb={1}>
                <b>
                  {(100 - (winLoseRatio * 100) / (winLoseRatio + 1)).toFixed(2)}
                </b>
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mt: 1, mb: -1 }}>
              <b>Trades</b>
            </Typography>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography>Total Closed Trades</Typography>
              <Typography variant="h5" mb={1}>
                <b>{closedTradesTotal}</b>
              </Typography>
              <Chart
                options={optionChart2}
                series={[closedTradesChart]}
                type="area"
                height={50}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography>Total Trades</Typography>
              <Typography variant="h5" mb={1}>
                <b>{allTradesTotal}</b>
              </Typography>
              <Chart
                options={optionChart2}
                series={[allTradesChart]}
                type="area"
                height={50}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography>Total Open Trades</Typography>
              <Typography variant="h5" mb={1}>
                <b>{openTradesTotal}</b>
              </Typography>
              <Chart
                options={optionChart2}
                series={[openTradesChart]}
                type="area"
                height={50}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography>Avg Num Trades</Typography>
              <Typography variant="h5" mb={1}>
                <b>{avgNumTrades.toFixed(2)}</b>
              </Typography>
              <Stack height={50} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography>Total Winner</Typography>
              <Typography variant="h5" mb={1}>
                <b>{totalWin}</b>
              </Typography>
              <Chart
                options={optionChart2}
                series={[totalWinChart]}
                type="area"
                height={50}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Paper sx={{ p: 2 }}>
              <Typography>Total Losers</Typography>
              <Typography variant="h5" mb={1}>
                <b>{totalLoss}</b>
              </Typography>
              <Chart
                options={optionChart2}
                series={[totalLossChart]}
                type="area"
                height={50}
              />
            </Paper>
          </Grid>
        </Grid>
      )}
    </Stack>
  );
}
