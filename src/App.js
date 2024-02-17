import React from "react";
import { SnackbarProvider, MaterialDesignContent } from "notistack";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import styled from "@emotion/styled";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/common/PrivateRoute";

import { setCurrentUser, logoutUser } from "./actions/authActions";

import Landing from "./components/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard";
import BrokerSync from "./components/addtrades/brokersync";
import TradesTable from "./components/TradesTable";
import PricePlan from "./components/payment/PricePlan";
import PaymentPagePro from "./components/payment/PaymentPagePro";
import PaymentPagePremium from "./components/payment/PaymentPagePremium";
import PaymentPageElite from "./components/payment/PaymentPageElite";
import PayPalCheckout from "./components/payment/PayPalCheck";
import NotFound from "./components/NotFound";

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  const tokenExp = new Date(decoded.exp);
  if (tokenExp.getTime() < currentTime) {
    store.dispatch(logoutUser());
  }
}

const StyledMaterialDesignContent = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-success": {
    backgroundColor: "#0094b6",
  },
}));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App" style={{ backgroundColor: "whitesmoke" }}>
          <SnackbarProvider
            Components={{ success: StyledMaterialDesignContent }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            maxSnack={5}
            preventDuplicate
          >
            <Routes>
              <Route path="/" Component={Landing} />
              <Route path="/login" Component={Login} />
              <Route path="/register" Component={Register} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/addtrades/broker_synchronization"
                element={
                  <PrivateRoute>
                    <BrokerSync />
                  </PrivateRoute>
                }
              />
              <Route
                path="/tradestable"
                element={
                  <PrivateRoute>
                    <TradesTable />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile/account_plan"
                element={
                  <PrivateRoute>
                    <PricePlan />
                  </PrivateRoute>
                }
              />
              <Route
                path="/payment-pro"
                element={
                  <PrivateRoute>
                    <PaymentPagePro />
                  </PrivateRoute>
                }
              />
              <Route
                path="/payment-premium"
                element={
                  <PrivateRoute>
                    <PaymentPagePremium />
                  </PrivateRoute>
                }
              />
              <Route
                path="/payment-elite"
                element={
                  <PrivateRoute>
                    <PaymentPageElite />
                  </PrivateRoute>
                }
              />
              <Route
                path="/payment/:membership"
                element={
                  <PrivateRoute>
                    <PayPalCheckout />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </SnackbarProvider>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
