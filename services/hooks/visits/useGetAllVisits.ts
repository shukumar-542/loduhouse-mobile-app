import { useState, useEffect, useCallback } from "react";
import { useGetAllVisitsQuery } from "@/services/api/clientsApi";
import type { VisitItem } from "@/components/visits/AllVisits";

const PAGE_SIZE = 10;

const mapVisit = (v: {
  _id: string;
  clientName: string;
  serviceType: string;
  photos?: string[];
  date: string;
}): VisitItem => ({
  id: v._id,
  date: new Date(v.date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }),
  name: v.clientName,
  items: v.serviceType.split(",").map((s) => s.trim()),
  media: v.photos ?? [],
});

export function useGetAllVisits() {
  const [page, setPage] = useState(1);
  const [allVisits, setAllVisits] = useState<VisitItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const { data, isLoading, isFetching, refetch } = useGetAllVisitsQuery(
    { page, limit: PAGE_SIZE },
    { refetchOnMountOrArgChange: true },
  );

  const totalPages = data?.data?.meta?.totalPages ?? 1;
  const total = data?.data?.meta?.totalCount ?? 0;

  useEffect(() => {
    if (!data?.data?.visits) return;

    const mapped = data.data.visits.map(mapVisit);

    setAllVisits((prev) => {
      const combined = page === 1 ? mapped : [...prev, ...mapped];
      // Deduplicate by id
      return Array.from(new Map(combined.map((v) => [v.id, v])).values());
    });
  }, [data, page]);

  const loadMore = useCallback(() => {
    if (!isFetching && page < totalPages) {
      setPage((prev) => prev + 1);
    }
  }, [isFetching, page, totalPages]);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(1);
    setAllVisits([]);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  return {
    visits: allVisits,
    total,
    isLoading: isLoading && page === 1,
    isFetching,
    hasMore: page < totalPages,
    refreshing,
    loadMore,
    handleRefresh,
  };
}
