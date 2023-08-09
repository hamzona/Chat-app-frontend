import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { selectMessages } from "./messgesSlice";
import { selectUser } from "../auth/authSlice";

export default function Messages() {
  const messages = useSelector(selectMessages);
  const nickname = useSelector(selectUser);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ smooth: true });
  }, [messages]);
  return (
    <div className="overflow-auto d-flex flex-column flex-grow-1">
      <div
        className="d-flex flex-column flex-grow-1 m-3"
        style={{ justifyContent: "flex-end" }}
      >
        {messages.map((message, index) => {
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
                className={`rounded p-1 ${
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
        <div ref={lastMessageRef} />
      </div>
    </div>
  );
}
