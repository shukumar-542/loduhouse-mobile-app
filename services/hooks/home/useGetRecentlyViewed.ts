import { useGetHomeDataQuery } from "@/services/api/homeApi";

interface RecentlyViewedClient {
  id: string;
  name: string;
  lastService: string;
  imageUri: string;
}

export const useGetRecentlyViewed = () => {
  const { data, isLoading, error } = useGetHomeDataQuery();

  const recentlyViewed: RecentlyViewedClient[] =
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
    isLoading,
    error,
  };
};
