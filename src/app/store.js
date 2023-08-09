import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import { apiSlice } from "./api/apiSlice";
import messgesSlice from "../features/messages/messgesSlice";
import chatsSlice from "../features/chats/chatsSlice";

export const store = configureStore({
  reducer: {
    chat: chatsSlice,
    message: messgesSlice,
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
  devTools: true,
});
