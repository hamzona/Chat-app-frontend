import { apiSlice } from "../../app/api/apiSlice";

const chatsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChats: builder.query({
      query: (nickname) => ({
        url: "/chats/allChats",
        method: "POST",
        body: { nickname },
      }),
      providesTags: ["Chats"],
    }),
    getChat: builder.query({
      query: (_id) => ({
        url: "chats/getChat",
        method: "POST",
        body: { _id },
      }),
      providesTags: ["Chats"],
    }),
    createChat: builder.mutation({
      query: (data) => ({
        url: "chats/createChat",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Chats"],
    }),
    /*getMessages: builder.query({
      query: (data) => ({
        url: "chats/getMessages",
        method: "POST",
        body: { ...data },
      }),
    }),*/
    createMessage: builder.mutation({
      query: (data) => ({
        url: "chats/createMessage",
        method: "POST",
        body: { ...data },
      }),
      invalidatesTags: ["Chats"],
    }),
    getNewMessage: builder.mutation({
      query: (_id) => ({
        url: "chats/getChat",
        method: "POST",
        body: { ..._id },
      }),
      invalidatesTags: ["Chats"],
    }),
  }),
});

export const {
  useGetChatsQuery,
  useGetChatQuery,
  useCreateChatMutation,
  useCreateMessageMutation,
  useGetNewMessageMutation,
} = chatsApiSlice;
