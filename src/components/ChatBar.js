import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  useGetChatQuery,
  useCreateMessageMutation,
} from "../features/chats/chatsApiSlice";
import { Button, Form, InputGroup } from "react-bootstrap";
import { useSocket } from "../contexts/SocketProvider";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { addMessage, setMessage } from "../features/messages/messgesSlice";
import Messages from "../features/messages/Messages";
export default function ChatBar() {
  const { id } = useParams();
  const { data, isError, isLoading, isSuccess, error } = useGetChatQuery({
    _id: id,
  });

  const dispatch = useDispatch();
  const [createMessage] = useCreateMessageMutation();

  const nickname = useSelector(selectUser);
  const socket = useSocket();
  const message = useRef("");

  async function hendleSubmit(e) {
    e.preventDefault();
    const messageValue = message.current.value;
    if (messageValue === "") return;

    console.log(nickname);

    socket.emit("send-message", {
      recipients: data.recipients,
      message: messageValue,
      nickname,
    });
    createMessage({ message: messageValue, nickname, _id: id });
    message.current.value = "";
    message.current.focus();
  }

  useEffect(() => {
    socket.on("recive-message", ({ message, nickname }) => {
      console.log(nickname);
      dispatch(addMessage({ content: message, nickname }));
    });

    return () => {
      socket.off("recive-message");
    };
  }, [socket]);
  /*Content */
  let content;
  if (data && isSuccess) {
    content = (
      <div className="d-flex flex-column flex-grow-1">
        <Messages />
        <Form onSubmit={hendleSubmit}>
          <Form.Group className="m-2">
            <InputGroup>
              <Form.Control
                style={{ height: "75px", resize: "none" }}
                as="textarea"
                ref={message}
              />

              <Button type="submit">submit</Button>
            </InputGroup>
          </Form.Group>
        </Form>
      </div>
    );
    setTimeout(() => {
      dispatch(setMessage(data.messages));
    }, 1000);
  } else if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = JSON.stringify(error);
    content = null;
  }

  return content;
}
