import React, { useEffect } from "react";
import { useRefreshMutation } from "../features/auth/authApiSlice";
import { useSelector } from "react-redux";
import { selectToken } from "../features/auth/authSlice";
import { Link, Outlet } from "react-router-dom";

export default function PresistLogin() {
  const [refresh, { isError }] = useRefreshMutation();

  const token = useSelector(selectToken);

  useEffect(() => {
    async function verifyRefreshToken() {
      try {
        await refresh();
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
  } else if (token) {
    content = <Outlet />;
  }

  return content;
}
