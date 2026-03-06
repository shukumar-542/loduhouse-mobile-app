import { baseApi } from "./baseApi";
import { Client } from "./clientsApi";
import { AllVisitEntry } from "./clientsApi";

// --- Search Visits ---
export interface SearchVisitsParams {
  serviceType: string;
}

export interface SearchVisit {
  _id: string;
  clientId: string;
  serviceType: string;
  photos: string[];
  videos: string[];
  date: string;
  clientName: string;
}

export interface SearchVisitsResponse {
  success: boolean;
  message: string;
  data: SearchVisit[];
}

// --- Search Clients ---
export interface SearchClientsParams {
  name: string;
}

export interface SearchClientsResponse {
  success: boolean;
  message: string;
  data: Client[];
}

// --- API ---
export const searchApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    searchVisits: builder.query<SearchVisitsResponse, SearchVisitsParams>({
      query: ({ serviceType }) => ({
        url: `/client-visits/search?serviceType=${encodeURIComponent(serviceType)}`,
        method: "GET",
      }),
      providesTags: ["Clients"],
    }),

    searchClients: builder.query<SearchClientsResponse, SearchClientsParams>({
      query: ({ name }) => ({
        url: `/clients/search?name=${encodeURIComponent(name)}`,
        method: "GET",
      }),
      providesTags: ["Clients"],
    }),
  }),
});

export const { useSearchVisitsQuery, useSearchClientsQuery } = searchApi;
