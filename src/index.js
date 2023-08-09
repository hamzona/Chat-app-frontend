import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "bootstrap/dist/css/bootstrap.min.css";
import { SocketProvider } from "./contexts/SocketProvider";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

//disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <SocketProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </SocketProvider>
    </Provider>
  </BrowserRouter>
);
