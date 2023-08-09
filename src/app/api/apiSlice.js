import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://chat-app-kvmx.onrender.com/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Berar ${token}`);
    }

    return headers;
  },
});

const fetchBaseQueryWithReAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.originalStatus === 403) {
    const refreshResult = await baseQuery("/refresh", api, extraOptions);
    if (refreshResult?.data) {
      // const user = api.getState.auth.user;
      api.dispatch(
        setCredentials({
          accessToken: refreshResult.data.accessToken,
          user: refreshResult.data.user,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: fetchBaseQueryWithReAuth,
  tagTypes: ["Chats"],
  endpoints: (builder) => ({}),
});
