import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { selectUser } from "../features/auth/authSlice";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState();

  const nickname = useSelector(selectUser);

  useEffect(() => {
    const newSocket = io("http://localhost:3500/", { query: { nickname } });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [nickname]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
