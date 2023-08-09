import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSingupMutation } from "./authApiSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";

export default function Singup() {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [nickname, setNickName] = useState("");
  const [password, setPassword] = useState("");

  const [singup] = useSingupMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function hendleSubmit(e) {
    e.preventDefault();
    const userData = await singup({ firstname, lastname, nickname, password });

    dispatch(
      setCredentials({
        accessToken: userData.accessToken,
        user: userData.nickname,
      })
    );
    navigate("/dashboard");
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
      <h1>Singup</h1>

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
          <Form.Label>firstname</Form.Label>

          <Form.Control
            type="text"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="firstname"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>lastname</Form.Label>

          <Form.Control
            type="text"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="lastname"
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
          If you have account already <Link to={"/login"}>login</Link>
        </Form.Text>
      </Form>
    </Container>
  );
}
