import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getToken } from "./utils";

// const Roles = ["Role_SUPPORT", "Role_RECEPTION", "Role_DOCTOR", "Role_PATIENT"];

// handle the private routes
const PrivateRoutes = () => {
  return getToken() ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;

// handle the public routes
export const PublicRoutes = () => {
  return !getToken() ? <Outlet /> : <Navigate to="/dashboard" />;
};
