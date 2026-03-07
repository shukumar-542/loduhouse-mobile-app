import { useState, useEffect, useCallback } from "react";
import { useGetAllClientsQuery } from "@/services/api/clientsApi";

export interface CleanClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  imageUri: string;
  notes: string;
  last: string;
}

export const useGetAllClients = () => {
  const [page, setPage] = useState(1);
  const [allClients, setAllClients] = useState<CleanClient[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, isFetching, error, refetch } = useGetAllClientsQuery(
    { page, limit: 10 },
    { refetchOnMountOrArgChange: true },
  );
  const totalPages = data?.meta?.totalPages ?? 1;

  // Map and deduplicate clients
  useEffect(() => {
    if (!data?.data) return;

    const mapped: CleanClient[] = data.data.map((client) => ({
      id: client?._id,
      name: client?.fullName,
      email: client?.email,
      phone: client?.phoneNumber ?? "N/A",
      imageUri: client?.picture ?? "",
      notes: client?.notes,
      last:client?.last,
    }));

    setAllClients((prev) => {
      const combined = page === 1 ? mapped : [...prev, ...mapped];
      // Deduplicate by ID
      return Array.from(new Map(combined.map((c) => [c.id, c])).values());
    });
  }, [data, page]);

  // Infinite scroll load more
  const loadMore = useCallback(() => {
    if (!isFetching && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  }, [isFetching, page, totalPages]);

  // Pull-to-refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1); // reset to first page
    setAllClients([]); // clear current list
    await refetch(); // fetch first page
    setRefreshing(false);
  }, [refetch]);

  return {
    clients: allClients,
    total: data?.meta?.total ?? 0,
    isLoading: isLoading && page === 1, // skeleton for first page only
    isFetching,
    error,
    loadMore,
    hasMore: page < totalPages,
    refreshing,
    handleRefresh,
  };
};
