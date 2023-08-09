import React from "react";
import { useGetChatsQuery } from "./chatsApiSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../auth/authSlice";
import { ListGroup } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

export default function Chats() {
  const nickname = useSelector(selectUser);

  const { id } = useParams();
  const {
    data: chats,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useGetChatsQuery(nickname);
  let content;
  if (isSuccess) {
    content = (
      <ListGroup>
        {chats.map((chat) => {
          return (
            <Link
              to={`/dashboard/${chat._id}`}
              key={chat._id}
              style={{ textDecoration: "none" }}
            >
              <ListGroup.Item action active={chat._id === id}>
                {`${chat.name} `}{" "}
                <div className="text-muted">{chat.recipients.join(", ")}</div>{" "}
              </ListGroup.Item>
            </Link>
          );
        })}
      </ListGroup>
    );
  } else if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <div>{JSON.stringify(error)}</div>;
  }
  // console.log(chats);
  return <div>{content}</div>;
}
