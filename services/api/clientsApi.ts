import { baseApi } from "./baseApi";

interface Client {
  _id: string;
  userId: string;
  fullName: string;
  phoneNumber?: string;
  email: string;
  notes: string;
  picture?: string;
  createdAt: string;
}

interface ClientsResponse {
  success: boolean;
  message: string;
  data: Client[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface GetClientsParams {
  page: number;
  limit: number;
}

export const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClients: builder.query<ClientsResponse, GetClientsParams>({
      query: ({ page, limit }) => ({
        url: `/clients?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Clients"],
    }),
  }),
});

export const { useGetAllClientsQuery } = clientApi;
