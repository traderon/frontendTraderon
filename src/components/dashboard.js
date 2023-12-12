import React, { useEffect, useState } from "react";
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
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { useTheme } from "@mui/material/styles";

import MainLayout from "../layouts/full/mainlayout";
import Spinner from "./common/Spinner";

export default function Dashboard() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const expired = useSelector((store) => store.auth.user.expired);
  const userId = useSelector((store) => store.auth.user.public_id);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (expired) {
      navigate("/profile/account_plan");
      enqueueSnackbar("Your Account is Expired", {
        variant: "error",
      });
    }
  }, [expired, navigate, enqueueSnackbar]);
  const [optionsColumnChart_1, setOptionsColumnChart_1] = useState({
    chart: {
      type: "area",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
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
      curve: "smooth",
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
    },
    xaxis: {},
  });
  const [optionsChart_2, setOptionsChart_2] = useState({
    chart: {
      id: "basic-bar",
    },
    stroke: {
      width: 2,
    },
    xaxis: {},
  });
  const [accumChart, setAccumChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [accumTotal, setAccumTotal] = useState(0);
  const [profitFactor, setProfitFactor] = useState(0);
  const [profitChart, setProfitChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [avgReturnTotal, setAvgReturnTotal] = useState(0);
  const [avgReturnChart, setAvgReturnChart] = useState({
    name: "",
    color: "#0094b6",
    data: [],
  });
  const [winRatio, setWinRatio] = useState(0);
  const [winRatioDonutChart, setWinRatioDonutChart] = useState([]);
  const [pnlTotal, setPnlTotal] = useState(0);
  const [pnlChange, setPnlChange] = useState(0);
  const [pnlDay, setPnlDay] = useState(0);
  const [volumeDay, setVolumeDay] = useState(0);
  const [totalPnl, setTotalPnl] = useState({
    name: "Total PnL",
    color: "#0094b6",
    data: [],
  });
  const [winCount, setWinCount] = useState(0);
  const [lossCount, setLossCount] = useState(0);
  const [dailyPnl, setDailylPnl] = useState({
    name: "Daily PnL",
    color: "#0094b6",
    data: [],
  });
  const [dailyVolume, setDailyVolume] = useState({
    name: "Daily Volume",
    color: "#0094b6",
    data: [],
  });
  const [totalWinRate, setTotalWinRate] = useState({
    name: "Total Win Rate",
    color: "#0094b6",
    data: [],
  });
  const [dailyWinRate, setDailyWinRate] = useState({
    name: "Daily Win Rate",
    color: "#0094b6",
    data: [],
  });
  const [score, setScore] = useState({
    name: "Total Win/Loss Score",
    color: "#0094b6",
    data: [],
  });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await axios
        .post("/api/get-chart", { userId })
        .then((res) => {
          const {
            accumulative_return,
            accumulative_return_total,
            xvalue_all,
            profit_factor,
            avg_profit_factor,
            avg_return,
            avg_return_total,
            win_ratio,
            pnl_total,
            pnl_change,
            pnl_day,
            volume_day,
            total_pnl,
            daily_pnl,
            daily_volume,
            total_win_rate,
            daily_win_rate,
            total_win_or_loss_score,
          } = res.data;
          setAccumTotal(accumulative_return_total);
          setAccumChart({ ...accumChart, data: accumulative_return.reverse() });
          setOptionsColumnChart_1({
            ...optionsColumnChart_1,
            xaxis: { categories: xvalue_all.reverse() },
          });
          setOptionsChart_2({
            ...optionsChart_2,
            xaxis: {
              categories: xvalue_all,
              tickAmount: 7,
            },
          });
          setProfitFactor(avg_profit_factor);
          setProfitChart({ ...profitChart, data: profit_factor.reverse() });
          setAvgReturnTotal(avg_return_total);
          setAvgReturnChart({ ...avgReturnChart, data: avg_return.reverse() });
          setWinRatio((win_ratio.winning * 100) / win_ratio.total);
          setWinRatioDonutChart([
            win_ratio.winning,
            win_ratio.total - win_ratio.winning,
          ]);
          setWinCount(win_ratio.winning);
          setLossCount(win_ratio.total - win_ratio.winning);
          setPnlTotal(pnl_total);
          setPnlChange(pnl_change);
          setPnlDay(pnl_day);
          setVolumeDay(volume_day);
          setTotalPnl({ ...totalPnl, data: total_pnl.reverse() });
          setDailylPnl({ ...dailyPnl, data: daily_pnl.reverse() });
          setDailyVolume({ ...dailyVolume, data: daily_volume.reverse() });
          setTotalWinRate({ ...totalWinRate, data: total_win_rate.reverse() });
          setDailyWinRate({ ...dailyWinRate, data: daily_win_rate.reverse() });
          setScore({ ...score, data: total_win_or_loss_score.reverse() });
          enqueueSnackbar(`Calculation with ${xvalue_all.length} trades done`, {
            variant: "success",
          });
        })
        .catch((err) => console.log(err));
      setIsLoading(false);
    })();
  }, []);

  // chart color
  const theme = useTheme();
  const primary = "#0094b6";
  const primarylight = "#ecf2ff";
  // const successlight = theme.palette.success.light;

  // donut chart
  const optionsdonutchart = {
    chart: {
      type: "donut",
      fontFamily: "'Plus Jakarta Sans', sans-serif;",
      foreColor: "#adb0bb",
      toolbar: {
        show: false,
      },
      height: 155,
    },
    colors: [primary, primarylight, "#F9F9FD"],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        donut: {
          size: "75%",
          background: "transparent",
        },
      },
    },
    labels: ["WIN", "LOSS"],
    tooltip: {
      theme: theme.palette.mode === "dark" ? "dark" : "light",
      fillSeriesColor: false,
    },
    stroke: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    responsive: [
      {
        breakpoint: 991,
        options: {
          chart: {
            width: 120,
          },
        },
      },
    ],
  };

  return (
    <MainLayout title="Dashboard">
      {isLoading ? (
        <Stack
          height="calc(100vh - 135px)"
          width="100%"
          justifyContent="center"
          alignItems="center"
        >
          <Spinner />
        </Stack>
      ) : (
        <Grid container spacing={{ xs: 1, md: 2 }} p={{ xs: 1, md: 2 }}>
          <Grid item xs={12} sm={6} lg={3}>
            <Paper sx={{ padding: 1 }}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-around"
              >
                <Grid item xs={6}>
                  <Typography variant="body2">Accumulative Return </Typography>
                  <Typography>{accumTotal.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Chart
                    options={optionsColumnChart_1}
                    series={[accumChart]}
                    type="area"
                    height="60px"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Paper sx={{ padding: 1 }}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-around"
              >
                <Grid item xs={6}>
                  <Typography variant="body2">Profit Factor</Typography>
                  <Typography>{profitFactor.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Chart
                    options={optionsColumnChart_1}
                    series={[profitChart]}
                    type="area"
                    height="60px"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Paper sx={{ padding: 1 }}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-around"
              >
                <Grid item xs={6}>
                  <Typography variant="body2">Avg Return</Typography>
                  <Typography>{avgReturnTotal.toFixed(2)}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Chart
                    options={optionsColumnChart_1}
                    series={[avgReturnChart]}
                    type="area"
                    height="60px"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} lg={3}>
            <Paper sx={{ padding: 1 }}>
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-around"
              >
                <Grid item xs={6}>
                  <Typography variant="body2">Win %</Typography>
                  <Typography>{`${winRatio.toFixed(2)}%`}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Chart
                    options={optionsdonutchart}
                    series={winRatioDonutChart}
                    type="donut"
                    height="82px"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper sx={{ p: { xs: 1, sm: 1.5, md: 1, lg: 2 } }}>
              <Typography variant="h5">
                <b>{`$ ${pnlTotal.toFixed(2)}`}</b>
              </Typography>
              <Stack direction="row" alignItems="flex-end" spacing={1} mt={2}>
                <Typography color="#0094b6" variant="h6">
                  PnL
                </Typography>
                <Typography color="dimgray">Total</Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper sx={{ p: { xs: 1, sm: 1.5, md: 1, lg: 2 } }}>
              <Typography variant="h5">
                <b>{`${pnlChange.toFixed(2)} %`}</b>
              </Typography>
              <Stack direction="row" alignItems="flex-end" spacing={1} mt={2}>
                <Typography color="#0094b6" variant="h6">
                  PnL
                </Typography>
                <Typography color="dimgray">% Change</Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper sx={{ p: { xs: 1, sm: 1.5, md: 1, lg: 2 } }}>
              <Typography variant="h5">
                <b>{`$ ${pnlDay.toFixed(2)}`}</b>
              </Typography>
              <Stack direction="row" alignItems="flex-end" spacing={1} mt={2}>
                <Typography color="#0094b6" variant="h6">
                  PnL
                </Typography>
                <Typography color="dimgray">/Day</Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper sx={{ p: { xs: 1, sm: 1.5, md: 1, lg: 2 } }}>
              <Typography variant="h5">
                <b>{volumeDay.toFixed(2)}</b>
              </Typography>
              <Stack direction="row" alignItems="flex-end" spacing={1} mt={2}>
                <Typography color="#0094b6" variant="h6">
                  Volume
                </Typography>
                <Typography color="dimgray">/Day</Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 1.5, position: "relative" }}>
              <Typography my={1} variant="subtitle1">
                Total PnL
              </Typography>
              <IconButton sx={{ position: "absolute", top: 10, right: 10 }}>
                <MoreHorizIcon />
              </IconButton>
              <Divider sx={{ mx: -1.5, mb: 1 }} />
              <Chart
                options={optionsChart_2}
                series={[totalPnl]}
                type="line"
                height={350}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 1.5, position: "relative" }}>
              <Typography my={1} variant="subtitle1">
                Daily PnL
              </Typography>
              <IconButton sx={{ position: "absolute", top: 10, right: 10 }}>
                <MoreHorizIcon />
              </IconButton>
              <Divider sx={{ mx: -1.5, mb: 1 }} />
              <Chart
                options={optionsChart_2}
                series={[dailyPnl]}
                type="line"
                height={350}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 1.5, position: "relative" }}>
              <Typography my={1} variant="subtitle1">
                Daily Volume
              </Typography>
              <IconButton sx={{ position: "absolute", top: 10, right: 10 }}>
                <MoreHorizIcon />
              </IconButton>
              <Divider sx={{ mx: -1.5, mb: 1 }} />
              <Chart
                options={optionsChart_2}
                series={[dailyVolume]}
                type="line"
                height={350}
              />
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper sx={{ p: { xs: 1, sm: 1.5, md: 1, lg: 2 } }}>
              <Typography variant="h5">
                <b>{`${winRatio.toFixed(2)} %`}</b>
              </Typography>
              <Stack direction="row" alignItems="flex-end" spacing={1} mt={2}>
                <Typography color="#0094b6" variant="h6">
                  Win rate
                </Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper sx={{ p: { xs: 1, sm: 1.5, md: 1, lg: 2 } }}>
              <Typography variant="h5">
                <b>{`${winRatio.toFixed(2)} %`}</b>
              </Typography>
              <Stack direction="row" alignItems="flex-end" spacing={1} mt={2}>
                <Typography color="#0094b6" variant="h6">
                  Win rate
                </Typography>
                <Typography color="dimgray">% Change</Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper sx={{ p: { xs: 1, sm: 1.5, md: 1, lg: 2 } }}>
              <Typography variant="h5">
                <b>{winCount}</b>
              </Typography>
              <Stack direction="row" alignItems="flex-end" spacing={1} mt={2}>
                <Typography color="#0094b6" variant="h6">
                  Wins
                </Typography>
                <Typography color="dimgray">Total</Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={6} md={3}>
            <Paper sx={{ p: { xs: 1, sm: 1.5, md: 1, lg: 2 } }}>
              <Typography variant="h5">
                <b>{lossCount}</b>
              </Typography>
              <Stack direction="row" alignItems="flex-end" spacing={1} mt={2}>
                <Typography color="#0094b6" variant="h6">
                  Losses
                </Typography>
                <Typography color="dimgray">Total</Typography>
              </Stack>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 1.5, position: "relative" }}>
              <Typography my={1} variant="subtitle1">
                Total Win Rate
              </Typography>
              <IconButton sx={{ position: "absolute", top: 10, right: 10 }}>
                <MoreHorizIcon />
              </IconButton>
              <Divider sx={{ mx: -1.5, mb: 1 }} />
              <Chart
                options={optionsChart_2}
                series={[totalWinRate]}
                type="line"
                height={350}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 1.5, position: "relative" }}>
              <Typography my={1} variant="subtitle1">
                Daily Win Rate
              </Typography>
              <IconButton sx={{ position: "absolute", top: 10, right: 10 }}>
                <MoreHorizIcon />
              </IconButton>
              <Divider sx={{ mx: -1.5, mb: 1 }} />
              <Chart
                options={optionsChart_2}
                series={[dailyWinRate]}
                type="line"
                height={350}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Paper sx={{ p: 1.5, position: "relative" }}>
              <Typography my={1} variant="subtitle1">
                Total Win/Loss Score
              </Typography>
              <IconButton sx={{ position: "absolute", top: 10, right: 10 }}>
                <MoreHorizIcon />
              </IconButton>
              <Divider sx={{ mx: -1.5, mb: 1 }} />
              <Chart
                options={optionsChart_2}
                series={[score]}
                type="line"
                height={350}
              />
            </Paper>
          </Grid>
        </Grid>
      )}
    </MainLayout>
  );
}
