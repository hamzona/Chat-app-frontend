import React, { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "../features/auth/authApiSlice";
import { useSelector } from "react-redux";
import { selectToken } from "../features/auth/authSlice";
import { Link, Outlet } from "react-router-dom";

export default function PresistLogin() {
  const [refresh, { isError }] = useRefreshMutation();

  const token = useSelector(selectToken);
  const [trueSuccess, setTrueSuccess] = useState(false);

  useEffect(() => {
    async function verifyRefreshToken() {
      try {
        await refresh();
        // setTrueSuccess(true);
      } catch (err) {
        console.log(err);
      }
    }

    if (!token) verifyRefreshToken();
  }, []);

  let content;

  if (isError) {
    content = (
      <div>
        You are loged out:
        <Link to="/login">login</Link>
      </div>
    );
  } else if (trueSuccess || token) {
    content = <Outlet />;
  }

  return content;
}
