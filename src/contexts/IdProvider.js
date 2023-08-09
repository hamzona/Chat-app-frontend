import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const IdContext = React.createContext();

export function useId() {
  return useContext(IdContext);
}

export function IdProvider({ children }) {
  const [id, setId] = useState(null);

  return (
    <IdContext.Provider value={{ id, setId }}>{children}</IdContext.Provider>
  );
}
