import React, { useState } from "react";
import { useLoginMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { Link, useNavigate } from "react-router-dom";

import { Button, Container, Form } from "react-bootstrap";

export default function Login() {
  const [nickname, setNickName] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useLoginMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function hendleSubmit(e) {
    e.preventDefault();
    try {
      const userData = await login({ nickname, password }).unwrap();

      dispatch(
        setCredentials({
          accessToken: userData.accessToken,
          user: userData.user,
        })
      );
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "100vh",
      }}
      //className="align-items-centar d-flex flex-column h-100 align-items-center justify-content-center"
    >
      <h1>Login</h1>

      <Form
        onSubmit={hendleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Form.Group>
          <Form.Label>nickname</Form.Label>

          <Form.Control
            type="text"
            value={nickname}
            onChange={(e) => setNickName(e.target.value)}
            placeholder="nickname"
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>password</Form.Label>

          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
        </Form.Group>

        <Button style={{ marginTop: "15px" }} type="submit">
          submit
        </Button>
        <Form.Text muted>
          If you dont have account already <Link to={"/singup"}>singup</Link>
        </Form.Text>
      </Form>
    </Container>
  );
}
