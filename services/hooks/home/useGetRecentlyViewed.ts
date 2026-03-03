// useGetRecentlyViewed.ts
import { useGetHomeDataQuery } from "@/services/api/homeApi";

export const useGetRecentlyViewed = () => {
  const { data, isLoading, isFetching, error, refetch } = useGetHomeDataQuery();

  const recentlyViewed =
    data?.data?.recentlyViewed?.map((client: any) => ({
      id: client.clientId,
      name: client.clientName,
      lastService: client.last,
      imageUri: client.picture || "",
    })) ?? [];

  const totalClients = data?.data?.totalClients ?? 0;
  const recentVisits = data?.data?.totalRecentVisits ?? 0;

  return {
    recentlyViewed,
    totalClients,
    recentVisits,
    isLoading, // true only on initial load
    isFetching, // true for any background fetch (including refetch)
    error,
    refetch, // function to manually trigger a fetch
  };
};
