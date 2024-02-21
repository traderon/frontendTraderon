import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
// action
import { getTradesData } from "../../actions/tradesActions";
// mui
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputAdornment from "@mui/material/InputAdornment";
import SettingsIcon from "@mui/icons-material/Settings";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AutoComplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
// components
import MainLayout from "../../layouts/full/mainlayout";
import Spinner from "../common/Spinner";

import metaServerData from "../../config/metatraderServerNames.json";

const brokers = ["Oanda", "Metatrader"];
// oanda
const dataRanges = ["All Trades", "Latest Trades"];
const timezones = ["DO NOT CONVERT"];
// metatrader
const metatraderTypes = ["mt4", "mt5"];
const metatraderBrokers = ["GrowthNext"];

function delay(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function BrokerSync() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const expired = useSelector((store) => store.auth.user.expired);
  useEffect(() => {
    if (expired) {
      navigate("/profile/account_plan");
      enqueueSnackbar("Your Account is Expired", {
        variant: "error",
      });
    }
  }, [expired, navigate, enqueueSnackbar]);

  const userId = useSelector((store) => store.auth.user.public_id);
  const loading = useSelector((store) => store.trades.loading);

  const [broker, setBroker] = useState("");
  // oanda
  const [apiKey, setApiKey] = useState("");
  const [accountId, setAccountId] = useState("");
  const [dataRange, setDataRange] = useState("Latest Trades");
  const [timezone, setTimezone] = useState("DO NOT CONVERT");
  // metatrader
  const [mtValue, setMtValue] = useState("");
  const [mtLoginId, setMtLoginId] = useState("");
  const [mtPassword, setMtPassword] = useState("");
  const [mtBroker, setMtBroker] = useState("");
  const [mtServer, setMtServer] = useState("");

  const [serverOpen, setServerOpen] = useState(false);
  const [metatraderServers, setMetatraderServers] = useState([]);
  const serverLoading = serverOpen && metatraderServers.length === 0;

  useEffect(() => {
    let active = true;
    if (!serverLoading) return undefined;
    (async () => {
      if (active) {
        if (mtValue === "mt4") {
          setMetatraderServers(metaServerData.filter((data) => data.mt4 === 1));
        } else {
          setMetatraderServers(metaServerData.filter((data) => data.mt5 === 1));
        }
      }
      await delay(1e3);
    })();
    return () => {
      active = false;
    };
  }, [mtValue, serverLoading]);

  useEffect(() => {
    if (!serverOpen) setMetatraderServers([]);
  }, [serverOpen]);

  const [settings, setSettings] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const handleClickDialogOpen = () => {
    setDialogOpen(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    setApiKey("");
    setAccountId("");
    setDataRange("Latest Trades");
    setTimezone("DO NOT CONVERT");
    setMtValue("");
    setMtLoginId("");
    setMtPassword("");
    setMtBroker("");
    setMtServer("");
  };

  const renderOanda = (
    <>
      <DialogContent dividers>
        <Stack direction="column" spacing={2} p={1}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Typography>Enter Api Key</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Typography>Enter account number ID</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Typography>Select the data range to import</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth>
                <Select
                  labelId="datarange"
                  value={dataRange}
                  onChange={(e) => setDataRange(e.target.value)}
                >
                  {dataRanges.map((dataRange, index) => (
                    <MenuItem key={index} value={dataRange}>
                      {dataRange}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Typography>Select Timezone</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth>
                <Select
                  labelId="timezone"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                >
                  {timezones.map((timezone, index) => (
                    <MenuItem key={index} value={timezone}>
                      {timezone}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Stack spacing={0.5} color="dimgrey">
            <Typography>
              <b>Instructions:</b>
            </Typography>
            <Typography>
              1. Paste that code in the box above and click on "Connect
            </Typography>
            <Typography pl={2}>
              Note: You can get the API code by logging into your account,
              navigating to "My account" and then click on "Manage API access"
              and generate the API code.
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disabled={
            apiKey.trim().length === 0 ||
            accountId.trim().length === 0 ||
            broker.trim().length === 0
          }
          sx={{ m: 1, bgcolor: "#0094b6" }}
          onClick={() => {
            dispatch(
              getTradesData(
                {
                  broker,
                  key: apiKey,
                  id: accountId,
                  user: userId,
                },
                navigate,
                enqueueSnackbar
              )
            );
            handleDialogClose();
          }}
        >
          Connect
        </Button>
      </DialogActions>
    </>
  );

  const renderMetatrader = (
    <>
      <DialogContent dividers>
        <Stack spacing={2} p={1}>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Typography>Metatrader Type</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth>
                <Select
                  value={mtValue}
                  onChange={(e) => setMtValue(e.target.value)}
                >
                  {metatraderTypes.map((type, index) => (
                    <MenuItem key={index} value={type}>
                      {type.toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Typography>Enter Metatrader Login</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                value={mtLoginId}
                onChange={(e) => setMtLoginId(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Typography>Enter Metatrader Password</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                fullWidth
                value={mtPassword}
                onChange={(e) => setMtPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Typography>Select Broker</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth>
                <Select
                  labelId="datarange"
                  disabled={mtValue === ""}
                  value={mtBroker}
                  onChange={(e) => setMtBroker(e.target.value)}
                >
                  {metatraderBrokers.map((broker, index) => (
                    <MenuItem key={index} value={broker}>
                      {broker}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={12} sm={4}>
              <Typography>Select Server Namee</Typography>
            </Grid>
            <Grid item xs={12} sm={8}>
              <AutoComplete
                open={serverOpen}
                disabled={mtBroker.length === 0}
                onOpen={() => setServerOpen(true)}
                onClose={() => setServerOpen(false)}
                onChange={(e, newValue) => {
                  setMtServer(newValue.name);
                }}
                isOptionEqualToValue={(server, value) =>
                  server.name === value.name
                }
                getOptionLabel={(server) => server.name}
                options={metatraderServers}
                loading={serverLoading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {serverLoading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          disabled={
            mtValue.trim().length === 0 ||
            mtLoginId.trim().length === 0 ||
            mtPassword.trim().length === 0 ||
            mtBroker.trim().length === 0 ||
            mtServer.trim().length === 0
          }
          sx={{ m: 1, bgcolor: "#0094b6" }}
          onClick={() => {
            dispatch(
              getTradesData(
                {
                  broker,
                  user: userId,
                  id: mtLoginId,
                  password: mtPassword,
                  mtType: mtValue,
                  passphrase: mtServer,
                },
                navigate,
                enqueueSnackbar
              )
            );
            handleDialogClose();
          }}
        >
          Connect
        </Button>
      </DialogActions>
    </>
  );

  return (
    <MainLayout title="Broker Synchronization">
      <Stack width="100%" p={{ xs: 1, md: 2 }}>
        {loading ? (
          <Stack height="calc(100vh - 135px)" justifyContent="center">
            <Spinner />
          </Stack>
        ) : (
          <Card sx={{ p: 3 }}>
            <Stack direction="column" spacing={3}>
              <Typography variant="h6">
                <b>Auto Import Files From Your Brokerage/Platform</b>
              </Typography>
              <Stack
                direction={{ xs: "column", md: "row" }}
                alignItems={{ xs: "flex-start", md: "center" }}
                spacing={1}
              >
                <Typography minWidth={170}>
                  <b>Select Your Broker:</b>
                </Typography>
                <FormControl fullWidth>
                  <Select
                    labelId="broker"
                    value={broker}
                    onChange={(e) => setBroker(e.target.value)}
                  >
                    {brokers.map((broker, index) => (
                      <MenuItem key={index} value={broker}>
                        {broker}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  onClick={handleClickDialogOpen}
                  disabled={broker.length === 0}
                  sx={{ bgcolor: "#0094b6" }}
                >
                  Connect Account
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  disabled={broker.length === 0}
                >
                  Sync All Accounts
                </Button>
              </Stack>
              <Stack direction="column" color="dimgrey" spacing={0.5}>
                <Typography>
                  Want us to add your platform? or do you have issuses with auto
                  import? Please contact us.
                </Typography>
                <Typography>
                  Note: Please use the settings below to set the timezone,
                  currency and advanced settings for custom grouping of trades
                  for your auto-imported trades.
                </Typography>
                <Typography>
                  <b>
                    Note: Most connection issues can be resolved by simply
                    deleting and re-establishing your connection.
                  </b>
                </Typography>
                <Typography>
                  <b>
                    NEW: You can now set the sync from date for TD-A and other
                    brokers (for IB, use flex query history)
                  </b>
                </Typography>
                <Typography>
                  <b>
                    Deleting a connection DOES NOT delete ANY data from your
                    account.
                  </b>
                </Typography>
              </Stack>
              <FormControl fullWidth>
                <InputLabel id="import-settings">
                  Auto import settings
                </InputLabel>
                <Select
                  labelId="import-settings"
                  value={settings}
                  label="Auto import settings"
                  startAdornment={
                    <InputAdornment position="start">
                      <SettingsIcon sx={{ color: "#0094b6" }} />
                    </InputAdornment>
                  }
                  onChange={(e) => setSettings(e.target.value)}
                >
                  <MenuItem />
                </Select>
              </FormControl>
            </Stack>
          </Card>
        )}
      </Stack>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Typography fontSize={18} my={1}>
            <b>Insert here your Credentials</b>
          </Typography>
        </DialogTitle>
        <IconButton
          onClick={handleDialogClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        {broker === "Oanda" && renderOanda}
        {broker === "Metatrader" && renderMetatrader}
      </Dialog>
    </MainLayout>
  );
}
