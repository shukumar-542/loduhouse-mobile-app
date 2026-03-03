import { baseApi } from "./baseApi";

interface HomeData {
  totalClients: number;
  totalRecentVisits: number;
  recentlyViewed: Array<{
    id: string;
    name: string;
    lastService: string;
    imageUri: string;
  }>;
}

interface HomeResponse {
  success: boolean;
  message: string;
  data: HomeData;
}

export const homeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getHomeData: builder.query<HomeResponse, void>({
      query: () => ({
        url: "/clients/home",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetHomeDataQuery } = homeApi;
