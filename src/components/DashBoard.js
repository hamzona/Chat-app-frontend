import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import SideBar from "./SideBar";
import ChatBar from "./ChatBar";
import { useId } from "../contexts/IdProvider";
import { useLocation, useParams } from "react-router-dom";
export default function DashBoard() {
  const user = useSelector(selectUser);
  const { setId } = useId();

  const location = useLocation();
  const { id } = useParams();
  useEffect(() => {
    setId(id);
  }, [location]);
  return (
    <div style={{ height: "100vh" }} className="d-flex">
      <SideBar />
      <ChatBar />
    </div>
  );
}
