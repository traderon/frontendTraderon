import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  return localStorage.jwtToken ? <>{children}</> : <Navigate to="/login" />;
}
