import {
  useSearchClientsQuery,
  useSearchVisitsQuery,
} from "@/services/api/searchApi";

export type SearchMode = "clients" | "visits";

const useGetSearchedResult = (query: string, mode: SearchMode) => {
  const shouldSearch = query.trim().length >= 1;

  const {
    data: clientData,
    isFetching: clientFetching,
    isError: clientError,
  } = useSearchClientsQuery(
    { name: query },
    { skip: !shouldSearch || mode !== "clients" },
  );

  const {
    data: visitData,
    isFetching: visitFetching,
    isError: visitError,
  } = useSearchVisitsQuery(
    { serviceType: query },
    { skip: !shouldSearch || mode !== "visits" },
  );

  const isFetching = clientFetching || visitFetching;
  const isError = clientError || visitError;
  const clientResults = clientData?.data ?? [];
  const visitResults = visitData?.data ?? [];
  const results = mode === "clients" ? clientResults : visitResults;

  return {
    results,
    isFetching,
    isError,
    hasResults: results.length > 0,
  };
};

export default useGetSearchedResult;
