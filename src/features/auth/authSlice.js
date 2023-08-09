import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, user: null },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken, user } = action.payload;

      state.token = accessToken;
      state.user = user;
    },
    logOut: (state, action) => {
      state.token = null;
      state.user = null;
    },
  },
});

export default authSlice.reducer;

export const { setCredentials, logOut } = authSlice.actions;

export const selectToken = (state) => state.auth.token;

export const selectUser = (state) => state.auth.user;
