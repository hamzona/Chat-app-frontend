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

  const [validated, setValidated] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function hendleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    const userData = await singup({ firstname, lastname, nickname, password });

    if (userData?.data) {
      dispatch(
        setCredentials({
          accessToken: userData.accessToken,
          user: userData.nickname,
        })
      );
      navigate("/dashboard");
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
    >
      <h1>Singup</h1>

      <Form
        noValidate
        validated={validated}
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
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>firstname</Form.Label>

          <Form.Control
            type="text"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="firstname"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>lastname</Form.Label>

          <Form.Control
            type="text"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="lastname"
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>password</Form.Label>

          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            required
          />
        </Form.Group>

        <Button style={{ marginTop: "15px" }} type="submit">
          submit
        </Button>
        <Form.Text muted>
          If you have account already <Link to={"/"}>login</Link>
        </Form.Text>
      </Form>
    </Container>
  );
}
