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

// --- All Visits ---
export interface AllVisitEntry {
  _id: string;
  clientId: string;
  clientName: string;
  serviceType: string;
  photos?: string[];
  videos?: string[];
  date: string;
}

export interface AllVisitsMeta {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}

export interface AllVisitsResponse {
  success: boolean;
  message: string;
  data: {
    meta: AllVisitsMeta;
    visits: AllVisitEntry[];
  };
}

export interface GetAllVisitsParams {
  page?: number;
  limit?: number;
}

// --- Create Client ---
export interface CreateClientParams {
  fullName: string;
  phoneNumber?: string;
  email: string;
  notes?: string;
  picture?: {
    uri: string;
    name: string;
    type: string;
  };
}

export interface CreateClientResponse {
  success: boolean;
  message: string;
  data: Client;
}

// --- Update Client ---
export interface UpdateClientParams {
  id: string;
  fullName?: string;
  pnoneNumber?: string; // matches backend field name (typo intentional)
  email?: string;
  notes?: string;
  picture?: {
    uri: string;
    name: string;
    type: string;
  };
}

export interface UpdateClientResponse {
  success: boolean;
  message: string;
  data: Client;
}

// --- Delete Client ---
export interface DeleteClientResponse {
  success: boolean;
  message: string;
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

    getAllVisits: builder.query<AllVisitsResponse, GetAllVisitsParams>({
      query: ({ page = 1, limit = 10 }) =>
        `/client-visits/all-visits?page=${page}&limit=${limit}`,
      providesTags: ["Clients"],
    }),

    createClient: builder.mutation<CreateClientResponse, CreateClientParams>({
      query: ({ picture, ...fields }) => {
        const formData = new FormData();

        Object.entries(fields).forEach(([key, value]) => {
          if (value !== undefined) {
            formData.append(key, value);
          }
        });

        if (picture) {
          formData.append("picture", {
            uri: picture.uri,
            name: picture.name,
            type: picture.type,
          } as any);
        }

        return {
          url: `/clients/`,
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ["Clients"],
    }),

    updateClient: builder.mutation<UpdateClientResponse, UpdateClientParams>({
      query: ({ id, picture, ...fields }) => {
        const formData = new FormData();

        Object.entries(fields).forEach(([key, value]) => {
          if (value !== undefined) {
            formData.append(key, value);
          }
        });

        if (picture) {
          formData.append("picture", {
            uri: picture.uri,
            name: picture.name,
            type: picture.type,
          } as any);
        }

        return {
          url: `/clients/${id}`,
          method: "PATCH",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: (_result, _error, { id }) => [
        "Clients",
        { type: "Clients", id },
      ],
    }),

    deleteClient: builder.mutation<DeleteClientResponse, string>({
      query: (id) => ({
        url: `/clients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Clients"],
    }),
  }),
});

export const {
  useGetAllClientsQuery,
  useGetClientVisitsQuery,
  useGetAllVisitsQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientApi;
