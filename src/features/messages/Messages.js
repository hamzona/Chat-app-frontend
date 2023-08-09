import React from "react";
import { useSelector } from "react-redux";
import { selectMessages } from "./messgesSlice";
import { selectUser } from "../auth/authSlice";

export default function Messages() {
  const messages = useSelector(selectMessages);
  const nickname = useSelector(selectUser);

  // m-3 d-flex flex-column flex-grow-1 justify-content-end align-items-start
  return (
    <div className="overflow-auto d-flex flex-column flex-grow-1">
      <div
        className="d-flex flex-column flex-grow-1 m-3"
        style={{ justifyContent: "flex-end" }}
      >
        {messages.map((message, index) => {
          //console.log(nickname, message.nickname);
          return (
            <div
              key={index}
              className={`${
                nickname === message.nickname
                  ? "align-self-end"
                  : "align-self-start"
              } mr-2`}
            >
              <div
                className={`rounded p-1  ${
                  nickname === message.nickname
                    ? "bg-primary text-white"
                    : "border"
                }
              `}
              >
                {message.content}
              </div>
              <div
                style={{
                  textAlign: nickname === message.nickname ? "right" : "left",
                }}
                className={`text-muted small`}
              >
                {nickname === message.nickname ? "You" : message.nickname}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
