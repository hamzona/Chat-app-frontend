import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState();
  const { id } = useParams();

  useEffect(() => {
    const newSocket = io("https://chat-app-kvmx.onrender.com", {
      query: { id },
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
