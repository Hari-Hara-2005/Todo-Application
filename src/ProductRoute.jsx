import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        return false;
      }
      return true;
    } catch (error) {
      console.error(error.message);
      return false;
    }
  }
  return false;
};

const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/" />;
};

export default ProtectedRoute;
