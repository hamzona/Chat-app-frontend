import { createSlice } from "@reduxjs/toolkit";
import { useParams } from "react-router-dom";

const messageSlice = createSlice({
  name: "message",
  initialState: { messages: [] },
  reducers: {
    setMessage: (state, action) => {
      //console.log(action.payload);
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      // console.log(action.payload);

      state.messages = [...state.messages, action.payload];
    },
  },
});

export default messageSlice.reducer;

export const selectMessages = (state) => state.message.messages;

export const { setMessage, addMessage } = messageSlice.actions;
