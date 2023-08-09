import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/auth/authSlice";
import { apiSlice } from "./api/apiSlice";
import messgesSlice from "../features/messages/messgesSlice";

export const store = configureStore({
  reducer: {
    message: messgesSlice,
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});
