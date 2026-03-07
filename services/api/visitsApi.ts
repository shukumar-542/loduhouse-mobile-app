import { baseApi } from "./baseApi";

// --- Add Visit ---
export interface AddVisitParams {
  clientId: string;
  serviceType: string;
  photos?: { uri: string; name: string; type: string }[];
  videos?: { uri: string; name: string; type: string }[];
  serviceNotes?: string;
  personalNotes?: string;
  duration?: string;
  date?: string;
  servicePrice?: string;
  tips?: string;
}

export interface AddVisitResponse {
  success: boolean;
  message: string;
  data: any;
}

// --- Get Service Types ---
export interface GetServiceTypesResponse {
  success: boolean;
  message: string;
  data: string[];
}

// --- Get Visit Details ---
export interface VisitDetail {
  _id: string;
  clientId: string;
  serviceType: string;
  photos: string[];
  videos: string[];
  serviceNotes: string;
  personalNotes: string;
  duration: number;
  date: string;
  servicePrice: number;
  tips: number;
  createdAt: string;
  updatedAt: string;
}

export interface GetVisitDetailsResponse {
  success: boolean;
  message: string;
  data: {
    visit: VisitDetail;
    total: number;
  };
}

export const visitsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addVisit: builder.mutation<AddVisitResponse, AddVisitParams>({
      query: ({
        clientId,
        serviceType,
        photos,
        videos,
        serviceNotes,
        personalNotes,
        duration,
        date,
        servicePrice,
        tips,
      }) => {
        const formData = new FormData();

        formData.append("clientId", clientId);
        formData.append("serviceType", serviceType);

        if (serviceNotes) formData.append("serviceNotes", serviceNotes);
        if (personalNotes) formData.append("personalNotes", personalNotes);
        if (duration) formData.append("duration", duration);
        if (date) formData.append("date", date);
        if (servicePrice) formData.append("servicePrice", servicePrice);
        if (tips) formData.append("tips", tips);

        if (photos && photos.length > 0) {
          photos.forEach((photo) => {
            formData.append("photos", {
              uri: photo.uri,
              name: photo.name,
              type: photo.type,
            } as any);
          });
        }

        if (videos && videos.length > 0) {
          videos.forEach((video) => {
            formData.append("videos", {
              uri: video.uri,
              name: video.name,
              type: video.type,
            } as any);
          });
        }

        return {
          url: "/client-visits",
          method: "POST",
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: [
        "Clients",
        "Analytics",
        "RecentClients",
        "RevenueBreakdown",
      ],
    }),

    getServiceTypes: builder.query<GetServiceTypesResponse, void>({
      query: () => ({
        url: "/client-visits/service-types",
        method: "GET",
      }),
    }),

    getVisitDetails: builder.query<GetVisitDetailsResponse, string>({
      query: (id) => ({
        url: `/client-visits/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Clients", id }],
    }),
  }),
});

export const {
  useAddVisitMutation,
  useGetServiceTypesQuery,
  useGetVisitDetailsQuery,
} = visitsApi;
