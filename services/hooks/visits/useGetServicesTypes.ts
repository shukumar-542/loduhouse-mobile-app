import { useGetServiceTypesQuery } from "@/services/api/visitsApi";

export function useGetServiceTypes() {
  const { data, isLoading, isFetching, refetch } = useGetServiceTypesQuery();

  const serviceTypes = data?.data ?? [];

  return {
    serviceTypes,
    isLoading,
    isFetching,
    refetch,
  };
}
