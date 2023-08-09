import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useGetUsersQuery } from "../features/users/userApiSlice";
import { useCreateChatMutation } from "../features/chats/chatsApiSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
export default function CreateChatModal({ onHide }) {
  const {
    data: users,
    isError,
    isSuccess,
    isLoading,
    error,
  } = useGetUsersQuery();

  const nickname = useSelector(selectUser);
  const [selectedUsers, setSelectedUsers] = useState([nickname]);
  const [groupName, setGroupName] = useState("");
  const [createChat] = useCreateChatMutation();

  function hendleChange(nickname) {
    if (selectedUsers.includes(nickname)) {
      setSelectedUsers((prev) => {
        return prev.filter((i) => i !== nickname);
      });
    } else {
      setSelectedUsers((prev) => [...prev, nickname]);
    }
  }
  async function hendleSubmit(e) {
    e.preventDefault();

    const chatInfo = await createChat({
      recipients: selectedUsers,
      name: groupName,
    });
    onHide(false);
  }

  let usersContent;

  if (isLoading) {
    usersContent = <div>Loading...</div>;
  } else if (isSuccess) {
    usersContent = (
      <div className="m-2 overflow-auto">
        {users.map((user) => {
          if (user.nickname === nickname) return null;
          return (
            <Form.Group key={user._id}>
              <Form.Check
                type="checkbox"
                value={selectedUsers.includes(user.nickname)}
                onChange={() => hendleChange(user.nickname)}
                label={user.nickname}
              />
            </Form.Group>
          );
        })}
      </div>
    );
  } else if (isError) {
    usersContent = <div>{JSON.stringify(error)}</div>;
  }

  return (
    <div style={{ maxHeight: "90vh" }}>
      <Modal.Header closeButton onHide={() => onHide(false)}>
        Create group chat
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={hendleSubmit} className="d-flex flex-column">
          <Form.Group className="mb-3">
            <Form.Label>Group name:</Form.Label>

            <Form.Control
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="group name"
            />
          </Form.Group>
          <Form.Label>Users</Form.Label>
          {usersContent}

          <Button type="submit" className="mt-3">
            Create chat
          </Button>
        </Form>
      </Modal.Body>
    </div>
  );
}
