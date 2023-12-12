import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Stack, Box } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Popover from "@mui/material/Popover";

import DashboardIcon from "@mui/icons-material/Dashboard";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import InsightsIcon from "@mui/icons-material/Insights";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import TableViewIcon from "@mui/icons-material/TableView";

import { ReactComponent as LogoFull } from "../../assets/logo/templogo2.svg";
import "./Sidebar.css";

import { logoutUser } from "../../actions/authActions";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState({
    trade: false,
    reports: false,
    performance: false,
    addTrades: false,
    config: false,
  });
  const [openp, setOpenp] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [anchorE3, setAnchorE3] = useState(null);
  const [anchorE4, setAnchorE4] = useState(null);
  const [anchorE5, setAnchorE5] = useState(null);
  const [anchorE6, setAnchorE6] = useState(null);
  const [anchorE7, setAnchorE7] = useState(null);
  const [anchorE8, setAnchorE8] = useState(null);
  const [anchorE9, setAnchorE9] = useState(null);
  const [anchorE10, setAnchorE10] = useState(null);

  const subReports = [
    "Overview",
    "Hourly",
    "Weekly",
    "Monthly",
    "Entry Price",
    "Volumn",
    "Symbols",
    "Setups",
    "Mistakes",
    "Sector",
    "Change Percent",
    "Volumn Change",
    "HoldTime",
    "Distribution by Year",
    "Side",
    "Spread",
    "Position MFE",
    "Position MAE",
    "R Multiple",
    "Best Exit PnL",
    "Best Exit %",
  ];
  const subTrades = ["Trades", "Journal"];
  const subperf = ["Evaluator", "Simulator", "Management", "Calendar"];
  const subAdd = [
    "Import Trades",
    "Manual Entry",
    "Broker Synchronization",
    "History",
  ];
  const subConfig = [
    "Trade Settings",
    "Privacy",
    "Setup Mistakes",
    "Portfolio",
    "Fees",
    "Charts",
    "Custom Spread",
    "Trades Widgets",
    "Market Replay",
    "Theme",
  ];
  const subProfile = [
    "Personal Information",
    "Account Plan",
    "Billing",
    "Support",
  ];

  return (
    <>
      <Box
        className="sidebar"
        bgcolor="#0094b6"
        boxShadow="1px 0px 2px grey"
        position="fixed"
        overflow="auto"
        width={200}
        display={{ xs: "none", lg: "block" }}
      >
        <Stack
          display="flex"
          direction="column"
          alignItems="stretch"
          height="100vh"
        >
          <LogoFull height={20} style={{ marginTop: "20px" }} />
          <List sx={{ pt: 3, color: "white" }}>
            <ListItemButton component={Link} to="/dashboard">
              <ListItemIcon>
                <DashboardIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={{ color: "white", ml: -2 }}
              />
            </ListItemButton>

            <ListItemButton component={Link} to="/tradestable">
              <ListItemIcon>
                <TableViewIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary="Trades Table"
                sx={{ color: "white", ml: -2 }}
              />
            </ListItemButton>

            <ListItemButton
              onClick={() => {
                setOpen({
                  trade: false,
                  reports: !open.reports,
                  performance: false,
                  addTrades: false,
                  config: false,
                });
              }}
            >
              <ListItemIcon>
                <DataUsageIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Reports" sx={{ color: "white", ml: -2 }} />
              {open.reports ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open.reports} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {subReports.map((submenu, id) => (
                  <ListItemButton
                    key={id}
                    sx={{ pl: 4 }}
                    component={Link}
                    to={`/reports/${submenu.replace(/\s/g, "_").toLowerCase()}`}
                  >
                    <ListItemText primary={submenu} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>

            <ListItemButton
              onClick={() => {
                setOpen({
                  trade: !open.trade,
                  reports: false,
                  performance: false,
                  addTrades: false,
                  config: false,
                });
              }}
            >
              <ListItemIcon>
                <CurrencyExchangeIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Trades" sx={{ color: "white", ml: -2 }} />
              {open.trade ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open.trade} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {subTrades.map((submenu, id) => (
                  <ListItemButton
                    key={id}
                    sx={{ pl: 4 }}
                    component={Link}
                    to={`/trades/${submenu.replace(/\s/g, "_").toLowerCase()}`}
                  >
                    <ListItemText primary={submenu} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>

            <ListItemButton
              onClick={() => {
                setOpen({
                  trade: false,
                  reports: false,
                  performance: !open.performance,
                  addTrades: false,
                  config: false,
                });
              }}
            >
              <ListItemIcon>
                <ManageHistoryIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary="Performance"
                sx={{ color: "white", ml: -2 }}
              />
              {open.performance ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open.performance} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {subperf.map((submenu, id) => (
                  <ListItemButton
                    key={id}
                    sx={{ pl: 4 }}
                    component={Link}
                    to={`/performance/${submenu
                      .replace(/\s/g, "_")
                      .toLowerCase()}`}
                  >
                    <ListItemText primary={submenu} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>

            <ListItemButton component={Link} to="/marketreplay">
              <ListItemIcon>
                <InsightsIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary="Market replay"
                sx={{ color: "white", ml: -2 }}
              />
            </ListItemButton>

            <ListItemButton component={Link} to="/layout">
              <ListItemIcon>
                <ViewHeadlineIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Layout" sx={{ color: "white", ml: -2 }} />
            </ListItemButton>

            <ListItemButton
              onClick={() => {
                setOpen({
                  trade: false,
                  reports: false,
                  performance: false,
                  addTrades: !open.addTrades,
                  config: false,
                });
              }}
            >
              <ListItemIcon>
                <AddCircleIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary="Add trades"
                sx={{ color: "white", ml: -2 }}
              />
              {open.addTrades ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open.addTrades} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {subAdd.map((submenu, id) => (
                  <ListItemButton
                    key={id}
                    sx={{ pl: 4 }}
                    component={Link}
                    to={`/addtrades/${submenu
                      .replace(/\s/g, "_")
                      .toLowerCase()}`}
                  >
                    <ListItemText primary={submenu} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>

            <ListItemButton
              onClick={() => {
                setOpen({
                  trade: false,
                  reports: false,
                  performance: false,
                  addTrades: false,
                  config: !open.config,
                });
              }}
            >
              <ListItemIcon>
                <SettingsIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText
                primary="Configuration"
                sx={{ color: "white", ml: -2 }}
              />
              {open.config ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open.config} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {subConfig.map((submenu, id) => (
                  <ListItemButton
                    key={id}
                    sx={{ pl: 4 }}
                    component={Link}
                    to={`/config/${submenu.replace(/\s/g, "_").toLowerCase()}`}
                  >
                    <ListItemText primary={submenu} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </List>
          <Box flexGrow={1} />
          <List sx={{ color: "white" }}>
            <Collapse in={openp} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {subProfile.map((submenu, id) => (
                  <ListItemButton
                    key={id}
                    sx={{ pl: 4 }}
                    component={Link}
                    to={`/profile/${submenu.replace(/\s/g, "_").toLowerCase()}`}
                  >
                    <ListItemText primary={submenu} />
                  </ListItemButton>
                ))}
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText
                    primary="Logout"
                    onClick={() => dispatch(logoutUser())}
                  />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setOpenp(!openp);
                  setOpen({
                    trade: false,
                    reports: false,
                    performance: false,
                    addTrades: false,
                    config: false,
                  });
                }}
              >
                <ListItemIcon>
                  <AccountBoxIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText
                  primary="Profile"
                  sx={{ color: "white", ml: -2 }}
                />
                {!openp ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
          </List>
        </Stack>
      </Box>
      <Box
        className="sidebar"
        bgcolor="#0094b6"
        boxShadow="1px 0px 2px grey"
        position="fixed"
        overflow="auto"
        width={55}
        display={{ xs: "block", lg: "none" }}
      >
        <Stack
          display="flex"
          direction="column"
          alignItems="stretch"
          height="100vh"
        >
          <LogoFull height={20} style={{ marginTop: "20px" }} />
          <List sx={{ pt: 3, color: "white" }}>
            <ListItemButton
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
              }}
              sx={{ mb: 1 }}
            >
              <ListItemIcon>
                <DashboardIcon sx={{ color: "white" }} />
              </ListItemIcon>
            </ListItemButton>
            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={() => {
                setAnchorEl(null);
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              elevation={0}
            >
              <List
                component="div"
                disablePadding
                sx={{ bgcolor: "#0094b6", color: "white" }}
              >
                <ListItemButton component={Link} to="/dashboard">
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </List>
            </Popover>

            <ListItemButton
              onClick={(event) => {
                setAnchorE10(event.currentTarget);
              }}
              sx={{ mb: 1 }}
            >
              <ListItemIcon>
                <TableViewIcon sx={{ color: "white" }} />
              </ListItemIcon>
            </ListItemButton>
            <Popover
              open={Boolean(anchorE10)}
              anchorEl={anchorE10}
              onClose={() => {
                setAnchorE10(null);
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              elevation={0}
            >
              <List
                component="div"
                disablePadding
                sx={{ bgcolor: "#0094b6", color: "white" }}
              >
                <ListItemButton component={Link} to="/tradestable">
                  <ListItemText primary="Trades Table" />
                </ListItemButton>
              </List>
            </Popover>

            <ListItemButton
              onClick={(event) => {
                setAnchorE2(event.currentTarget);
              }}
              sx={{ mb: 1 }}
            >
              <ListItemIcon>
                <DataUsageIcon sx={{ color: "white" }} />
              </ListItemIcon>
            </ListItemButton>
            <Popover
              open={Boolean(anchorE2)}
              anchorEl={anchorE2}
              onClose={() => {
                setAnchorE2(null);
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              elevation={0}
            >
              <List
                component="div"
                disablePadding
                sx={{ bgcolor: "#0094b6", color: "white" }}
              >
                <ListItemButton>
                  <ListItemText primary="Reports" />
                </ListItemButton>
                {subReports.map((submenu, id) => (
                  <ListItemButton
                    key={id}
                    sx={{ pl: 4 }}
                    component={Link}
                    to={`/reports/${submenu.replace(/\s/g, "_").toLowerCase()}`}
                  >
                    <ListItemText primary={submenu} />
                  </ListItemButton>
                ))}
              </List>
            </Popover>

            <ListItemButton
              onClick={(event) => {
                setAnchorE3(event.currentTarget);
              }}
              sx={{ mb: 1 }}
            >
              <ListItemIcon>
                <CurrencyExchangeIcon sx={{ color: "white" }} />
              </ListItemIcon>
            </ListItemButton>
            <Popover
              open={Boolean(anchorE3)}
              anchorEl={anchorE3}
              onClose={() => {
                setAnchorE3(null);
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              elevation={0}
            >
              <List
                component="div"
                disablePadding
                sx={{ bgcolor: "#0094b6", color: "white" }}
              >
                <ListItemButton>
                  <ListItemText primary="Trades" />
                </ListItemButton>
                {subTrades.map((submenu, id) => (
                  <ListItemButton
                    key={id}
                    sx={{ pl: 4 }}
                    component={Link}
                    to={`/trades/${submenu.replace(/\s/g, "_").toLowerCase()}`}
                  >
                    <ListItemText primary={submenu} />
                  </ListItemButton>
                ))}
              </List>
            </Popover>

            <ListItemButton
              onClick={(event) => {
                setAnchorE4(event.currentTarget);
              }}
              sx={{ mb: 1 }}
            >
              <ListItemIcon>
                <ManageHistoryIcon sx={{ color: "white" }} />
              </ListItemIcon>
            </ListItemButton>
            <Popover
              open={Boolean(anchorE4)}
              anchorEl={anchorE4}
              onClose={() => {
                setAnchorE4(null);
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              elevation={0}
            >
              <List
                component="div"
                disablePadding
                sx={{ bgcolor: "#0094b6", color: "white" }}
              >
                <ListItemButton>
                  <ListItemText primary="Performance" />
                </ListItemButton>
                {subperf.map((submenu, id) => (
                  <ListItemButton
                    key={id}
                    sx={{ pl: 4 }}
                    component={Link}
                    to={`/performance/${submenu
                      .replace(/\s/g, "_")
                      .toLowerCase()}`}
                  >
                    <ListItemText primary={submenu} />
                  </ListItemButton>
                ))}
              </List>
            </Popover>

            <ListItemButton
              onClick={(event) => {
                setAnchorE5(event.currentTarget);
              }}
              sx={{ mb: 1 }}
            >
              <ListItemIcon>
                <InsightsIcon sx={{ color: "white" }} />
              </ListItemIcon>
            </ListItemButton>
            <Popover
              open={Boolean(anchorE5)}
              anchorEl={anchorE5}
              onClose={() => {
                setAnchorE5(null);
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              elevation={0}
            >
              <List
                component="div"
                disablePadding
                sx={{ bgcolor: "#0094b6", color: "white" }}
              >
                <ListItemButton component={Link} to="/marketreplay">
                  <ListItemText primary="Market replay" />
                </ListItemButton>
              </List>
            </Popover>

            <ListItemButton
              onClick={(event) => {
                setAnchorE6(event.currentTarget);
              }}
              sx={{ mb: 1 }}
            >
              <ListItemIcon>
                <ViewHeadlineIcon sx={{ color: "white" }} />
              </ListItemIcon>
            </ListItemButton>
            <Popover
              open={Boolean(anchorE6)}
              anchorEl={anchorE6}
              onClose={() => {
                setAnchorE6(null);
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              elevation={0}
            >
              <List
                component="div"
                disablePadding
                sx={{ bgcolor: "#0094b6", color: "white" }}
              >
                <ListItemButton component={Link} to="/layout">
                  <ListItemText primary="Layout" />
                </ListItemButton>
              </List>
            </Popover>

            <ListItemButton
              onClick={(event) => {
                setAnchorE7(event.currentTarget);
              }}
              sx={{ mb: 1 }}
            >
              <ListItemIcon>
                <AddCircleIcon sx={{ color: "white" }} />
              </ListItemIcon>
            </ListItemButton>
            <Popover
              open={Boolean(anchorE7)}
              anchorEl={anchorE7}
              onClose={() => {
                setAnchorE7(null);
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              elevation={0}
            >
              <List
                component="div"
                disablePadding
                sx={{ bgcolor: "#0094b6", color: "white" }}
              >
                <ListItemButton>
                  <ListItemText primary="Add Trades" />
                </ListItemButton>
                {subAdd.map((submenu, id) => (
                  <ListItemButton
                    key={id}
                    sx={{ pl: 4 }}
                    component={Link}
                    to={`/addtrades/${submenu
                      .replace(/\s/g, "_")
                      .toLowerCase()}`}
                  >
                    <ListItemText primary={submenu} />
                  </ListItemButton>
                ))}
              </List>
            </Popover>

            <ListItemButton
              onClick={(event) => {
                setAnchorE8(event.currentTarget);
              }}
              sx={{ mb: 1 }}
            >
              <ListItemIcon>
                <SettingsIcon sx={{ color: "white" }} />
              </ListItemIcon>
            </ListItemButton>
            <Popover
              open={Boolean(anchorE8)}
              anchorEl={anchorE8}
              onClose={() => {
                setAnchorE8(null);
              }}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              elevation={0}
            >
              <List
                component="div"
                disablePadding
                sx={{ bgcolor: "#0094b6", color: "white" }}
              >
                <ListItemButton>
                  <ListItemText primary="Configuration" />
                </ListItemButton>
                {subConfig.map((submenu, id) => (
                  <ListItemButton
                    key={id}
                    sx={{ pl: 4 }}
                    component={Link}
                    to={`/config/${submenu.replace(/\s/g, "_").toLowerCase()}`}
                  >
                    <ListItemText primary={submenu} />
                  </ListItemButton>
                ))}
              </List>
            </Popover>
          </List>
          <Box flexGrow={1} />
          <List sx={{ color: "white" }}>
            <ListItem disablePadding>
              <ListItemButton
                onClick={(event) => {
                  setAnchorE9(event.currentTarget);
                }}
                sx={{ mb: 1 }}
              >
                <ListItemIcon>
                  <AccountBoxIcon sx={{ color: "white" }} />
                </ListItemIcon>
              </ListItemButton>
            </ListItem>
            <Popover
              open={Boolean(anchorE9)}
              anchorEl={anchorE9}
              onClose={() => {
                setAnchorE9(null);
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              elevation={0}
            >
              <List
                component="div"
                disablePadding
                sx={{ bgcolor: "#0094b6", color: "white" }}
              >
                <ListItemButton>
                  <ListItemText primary="Profile" />
                </ListItemButton>
                {subProfile.map((submenu, id) => (
                  <ListItemButton
                    key={id}
                    sx={{ pl: 4 }}
                    component={Link}
                    to={`/profile/${submenu.replace(/\s/g, "_").toLowerCase()}`}
                  >
                    <ListItemText primary={submenu} />
                  </ListItemButton>
                ))}
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemText
                    primary="Logout"
                    onClick={() => dispatch(logoutUser())}
                  />
                </ListItemButton>
              </List>
            </Popover>
          </List>
        </Stack>
      </Box>
    </>
  );
};

export default Sidebar;
