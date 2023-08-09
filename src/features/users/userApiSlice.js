import { apiSlice } from "../../app/api/apiSlice";

const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/api/getUsers",
        methode: "GET",
      }),
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
