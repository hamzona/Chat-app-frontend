import React, { useState } from "react";
import { Tab, Nav, Button, Modal } from "react-bootstrap";
import Chats from "../features/chats/Chats";
import Users from "../features/users/Users";
import { useSelector } from "react-redux";
import { selectUser } from "../features/auth/authSlice";
import CreateChatModal from "./CreateChatModal";

const CHATS_KEY = "Chats";
const USERS_KEY = "Users";
export default function SideBar() {
  const nickname = useSelector(selectUser);
  const [activeKey, setActiveKey] = useState(CHATS_KEY);

  const [createChatOpen, setCreateChatOpen] = useState(false);
  return (
    <div
      style={{ width: "20vw", minWidth: "150px", height: "100vh" }}
      className="d-flex flex-column border"
    >
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CHATS_KEY}>{CHATS_KEY}</Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link eventKey={USERS_KEY}>{USERS_KEY}</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content className="overflow-auto flex-grow-1">
          <Tab.Pane eventKey={CHATS_KEY}>
            <Chats />
          </Tab.Pane>
          <Tab.Pane eventKey={USERS_KEY}>
            <Users setActiveKey={setActiveKey} />
          </Tab.Pane>
        </Tab.Content>
        <div className="border-top border-bottom p-2">{nickname}</div>
        <Button
          onClick={() => {
            setCreateChatOpen(true);
          }}
          className="m-3"
        >
          Create new Chat
        </Button>
      </Tab.Container>

      <Modal show={createChatOpen}>
        {" "}
        <CreateChatModal onHide={setCreateChatOpen} />{" "}
      </Modal>
    </div>
  );
}
