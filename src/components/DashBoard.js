import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import SideBar from "./SideBar";
import ChatBar from "./ChatBar";
export default function DashBoard() {
  const user = useSelector(selectUser);

  return (
    <div style={{ height: "100vh" }} className="d-flex">
      <SideBar />
      <ChatBar />
    </div>
  );
}
