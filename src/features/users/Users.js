import React from "react";
import { useGetUsersQuery } from "./userApiSlice";
import {
  useCreateChatMutation,
  useGetChatsQuery,
} from "../chats/chatsApiSlice";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";
export default function Users({ setActiveKey }) {
  const { data, isError, isLoading, isSuccess, error } = useGetUsersQuery();

  const nickname = useSelector(selectUser);

  const {
    data: chats,
    isError: isChatError,
    isSuccess: isChatSuccess,
  } = useGetChatsQuery(nickname);

  const [createChat] = useCreateChatMutation();
  const navigat = useNavigate();

  function isExsistingChat(user) {
    const usersArr = [user.nickname, nickname];
    usersArr.sort();
    let isExsisting = false;

    chats.forEach((chat) => {
      let exsistingUsersArr = [...chat.recipients];
      exsistingUsersArr.sort();

      if (JSON.stringify(exsistingUsersArr) === JSON.stringify(usersArr)) {
        isExsisting = true;

        setActiveKey("Chats");
        navigat(`/dashboard/${chat._id}`);
      }
    });

    return isExsisting;
  }
  async function hendleClick(user) {
    const i = isExsistingChat(user);
    if (i) return;
    try {
      const result = await createChat({
        name: "",
        recipients: [nickname, user.nickname],
      });
      if (result?.data) {
        navigat(`/dashboard/${result.data?._id}`);
        setActiveKey("Chats");
      }
    } catch (err) {
      console.log(err);
    }
  }

  let content;
  if (isSuccess) {
    content = (
      <ListGroup>
        {data.map((user) => {
          if (user.nickname === nickname) return null;
          return (
            <ListGroup.Item
              action
              onClick={() => {
                hendleClick(user);
              }}
              key={user._id}
            >
              <div className="font-weight-bold">{user.nickname}</div>
              <div className="text-muted small">
                {`${user.firstname}  ${user.lastname}`}
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    );
  } else if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = <div>{JSON.stringify(error)}</div>;
  }
  return <div>{content}</div>;
}
