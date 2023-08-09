import React from "react";
import { Link } from "react-router-dom";

export default function Public() {
  return (
    <div>
      <Link to="/login">login</Link>
      <Link to="/singup">singup</Link>
    </div>
  );
}
