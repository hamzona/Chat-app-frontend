import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chats",
  initialState: { chats: [] },
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
  },
});

export default chatSlice.reducer;

export const selectChats = (state) => state.chat.chats;

export const { setChats } = chatSlice.actions;
