import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";
import { API_BASE_URL } from "@/config/apiConfig";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    prepareHeaders: async (headers) => {
      const token = await SecureStore.getItemAsync("access_token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: [
    "Clients",
    "RecentClients",
    "Analytics",
    "RevenueBreakdown",
    "Profile",
  ],
  endpoints: () => ({}),
});
