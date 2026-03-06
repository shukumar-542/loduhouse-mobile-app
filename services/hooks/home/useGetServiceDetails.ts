import { useGetVisitDetailsQuery } from "@/services/api/visitsApi";
import { VisitDetail } from "@/services/api/visitsApi";

export type { VisitDetail as ServiceDetails };

export const useGetServiceDetails = (id: string) => {
  const { data, isLoading, isError } = useGetVisitDetailsQuery(id, {
    skip: !id,
  });

  return {
    service: data?.data?.visit ?? null,
    total: data?.data?.total ?? 0,
    isLoading,
    isError,
  };
};
