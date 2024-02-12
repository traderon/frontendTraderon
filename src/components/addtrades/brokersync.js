import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { getTradesData } from "../../actions/tradesActions";

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

import MainLayout from "../../layouts/full/mainlayout";
import Spinner from "../common/Spinner";

const brokers = ["Oanda","Metatrader"];
const dataRanges = ["All Trades", "Latest Trades"];
const timezones = ["DO NOT CONVERT"];

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
  const [apiKey, setApiKey] = useState("");
  const [accountId, setAccountId] = useState("");
  const [dataRange, setDataRange] = useState("Latest Trades");
  const [timezone, setTimezone] = useState("DO NOT CONVERT");

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
  };

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
                  userId,
                  accountId,
                  apiKey,
                  dataRange,
                  timezone,
                  broker,
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
      </Dialog>
    </MainLayout>
  );
}
