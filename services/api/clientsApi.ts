import { baseApi } from "./baseApi";

// --- Clients List ---

export interface Client {
  _id: string;
  userId: string;
  fullName: string;
  phoneNumber?: string;
  email: string;
  notes: string;
  picture?: string;
  createdAt: string;
}

export interface ClientsResponse {
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

export interface GetClientsParams {
  page: number;
  limit: number;
}

// --- Client Visits ---

export interface ClientInfo {
  picture: string;
  clientName: string;
  clientSince: string;
  totalVisit: number;
  notes: string;
  Phone: string;
  email: string;
  totalSpent: number;
}

export interface Visit {
  _id: string;
  clientId: string;
  serviceType: string;
  photos?: string[];
  videos?: string[];
  serviceNotes: string;
  date: string;
}

export interface ClientVisitsData {
  clientInfo: ClientInfo;
  visits: Visit[];
}

export interface ClientVisitsResponse {
  success: boolean;
  message: string;
  data: ClientVisitsData;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface GetClientVisitsParams {
  clientId: string;
  page?: number;
  limit?: number;
}

// --- API ---

export const clientApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllClients: builder.query<ClientsResponse, GetClientsParams>({
      query: ({ page, limit }) => ({
        url: `/clients?page=${page}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["Clients"],
    }),

    getClientVisits: builder.query<ClientVisitsResponse, GetClientVisitsParams>(
      {
        query: ({ clientId, page = 1, limit = 10 }) => ({
          url: `/client-visits?clientId=${clientId}&page=${page}&limit=${limit}`,
          method: "GET",
        }),
        providesTags: (_result, _error, { clientId }) => [
          { type: "Clients", id: clientId },
        ],
      },
    ),
  }),
});

export const { useGetAllClientsQuery, useGetClientVisitsQuery } = clientApi;
