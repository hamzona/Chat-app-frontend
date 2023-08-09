import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import store from "../app/store";
import { apiSlice } from "../app/api/apiSlice";

export default function Prefetch() {
  useEffect(() => {
    store.dispatch(apiSlice.endpoints.getUsers.initiate());
  }, []);
  return <Outlet />;
}
