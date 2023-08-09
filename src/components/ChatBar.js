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
import { setChats } from "../features/chats/chatsSlice";
export default function ChatBar() {
  const { id } = useParams();
  console.log(id);
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

    socket.emit("send-message", {
      recipients: data.recipients,
      message: messageValue,
      nickname,
      ChatId: data._id,
    });
    createMessage({ message: messageValue, nickname, _id: id });
    message.current.value = "";
    message.current.focus();
  }

  useEffect(() => {
    socket.on("recive-message", ({ message, nickname, chatId }) => {
      if (chatId === id) {
        dispatch(addMessage({ content: message, nickname }));
      }
    });

    return () => {
      socket.off("recive-message");
    };
  }, [socket]);

  /*Content */
  let content;
  if (data && isSuccess) {
    setTimeout(() => {
      dispatch(setMessage(data.messages));
    }, 1000);
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
  } else if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = JSON.stringify(error);
    content = null;
  }

  return content;
}
