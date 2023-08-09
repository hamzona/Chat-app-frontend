import React from "react";
import { useSelector } from "react-redux";
import { selectToken } from "../features/auth/authSlice";
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
  const token = useSelector(selectToken);

  return token ? <Outlet /> : <Navigate to={"/login"} />;
}
