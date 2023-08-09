import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useLocation, useParams } from "react-router-dom";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState();
  const { id } = useParams();

  const location = useLocation();
  console.log(id);
  //console.log(location);
  useEffect(() => {
    console.log(location);
    const newSocket = io("https://chat-app-kvmx.onrender.com", {
      query: { id },
    });
    setSocket(newSocket);

    return () => newSocket.close();
  }, [location]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
