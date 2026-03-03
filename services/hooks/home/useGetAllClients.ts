import { useState, useCallback, useEffect } from "react";
import { useGetAllClientsQuery } from "@/services/api/clientsApi";

export interface CleanClient {
  id: string;
  name: string;
  email: string;
  phone: string;
  imageUri: string;
  notes: string;
}

export const useGetAllClients = () => {
  const [page, setPage] = useState(1);
  const [allClients, setAllClients] = useState<CleanClient[]>([]);

  const { data, isLoading, isFetching, error, refetch } = useGetAllClientsQuery(
    { page, limit: 10 },
  );

  useEffect(() => {
    if (!data?.data) return;

    const mapped: CleanClient[] = data.data.map((client) => ({
      id: client._id,
      name: client.fullName,
      email: client.email,
      phone: client.phoneNumber ?? "N/A",
      imageUri: client.picture ?? "",
      notes: client.notes,
    }));

    setAllClients((prev) => (page === 1 ? mapped : [...prev, ...mapped]));
  }, [data]);

  const totalPages = data?.meta?.totalPages ?? 1;

  const loadMore = useCallback(() => {
    if (!isFetching && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  }, [isFetching, page, totalPages]);

  const handleRefresh = useCallback(() => {
    setPage(1);
    setAllClients([]);
    refetch();
  }, [refetch]);

  return {
    clients: allClients,
    total: data?.meta?.total ?? 0,
    isLoading: isLoading && page === 1,
    isFetching,
    error,
    loadMore,
    handleRefresh,
    hasMore: page < totalPages,
  };
};
