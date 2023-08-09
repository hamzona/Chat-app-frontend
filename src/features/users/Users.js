import React from "react";
import { useGetUsersQuery } from "./userApiSlice";
import { useCreateChatMutation } from "../chats/chatsApiSlice";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { selectUser } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";
export default function Users({ setActiveKey }) {
  const { data, isError, isLoading, isSuccess, error } = useGetUsersQuery();

  const [createChat] = useCreateChatMutation();
  const nickname = useSelector(selectUser);
  const navigat = useNavigate();
  async function hendleClick(user) {
    try {
      console.log(user);

      const result = await createChat({
        name: "Chat",
        recipients: [nickname, user.nickname],
      });
      if (result?.data) {
        navigat(`/dashboard/${result.data?._id}`);
        setActiveKey("Chats");
      }
      console.log(result);
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
                console.log(user);
                hendleClick(user);
              }}
              key={user._id}
            >
              {`${user.firstname}  ${user.lastname}`}
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
