import {
  useGetAllClientsQuery,
  useGetClientVisitsQuery,
} from "../../api/clientsApi";
import type { Client, ClientInfo, Visit } from "../../api/clientsApi";

// --- Types ---

export interface TimelineItem {
  id: string;
  date: string;
  name: string; // maps to Visit.serviceType
  items: string[]; // maps to [Visit.serviceNotes]
  media: string[]; // maps to Visit.photos + Visit.videos
}

export interface PhotoMedia {
  id: string;
  uri: string;
  type: "image" | "video";
}

export interface Notes {
  phoneNumber: string;
  email: string;
  totalSpent: number;
  preferences: string;
}

export interface ClientProfileDetails {
  id: string;
  name: string;
  image: string;
  clientSince: number;
  visits: number;
  preferences: string;
  timeline: TimelineItem[];
  media: PhotoMedia[];
  notes: Notes;
}

// --- Mapper: API Visit → TimelineItem ---

export const mapVisitToTimelineItem = (visit: Visit): TimelineItem => ({
  id: visit._id,
  date: visit.date?.split("T")[0] ?? "",
  name: visit.serviceType ?? "",
  items: visit.serviceNotes ? [visit.serviceNotes] : [],
  media: [...(visit.photos ?? []), ...(visit.videos ?? [])],
});
// --- Mapper: API response → ClientProfileDetails ---

export const mapApiToClientProfile = (
  clientId: string,
  clientInfo: ClientInfo,
  visits: Visit[],
): ClientProfileDetails => {
  const safeVisits = visits ?? [];

  return {
    id: clientId,
    name: clientInfo.clientName ?? "",
    image: clientInfo.picture ?? "",
    clientSince: Number(clientInfo.clientSince) || 0,
    visits: clientInfo.totalVisit ?? 0,
    preferences: clientInfo.notes ?? "",
    timeline: safeVisits.map(mapVisitToTimelineItem),
    media: safeVisits.flatMap((v) => [
      ...(v.photos ?? []).map((uri, i) => ({
        id: `${v._id}-photo-${i}`,
        uri,
        type: "image" as const,
      })),
      ...(v.videos ?? []).map((uri, i) => ({
        id: `${v._id}-video-${i}`,
        uri,
        type: "video" as const,
      })),
    ]),
    notes: {
      phoneNumber: clientInfo.Phone ?? "",
      email: clientInfo.email ?? "",
      totalSpent: clientInfo.totalSpent ?? 0,
      preferences: clientInfo.notes ?? "",
    },
  };
};

// --- Hooks ---

export const useGetClientProfile = (
  clientId: string,
): {
  data: ClientProfileDetails | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, isLoading, isError } = useGetClientVisitsQuery({ clientId });
  return {
    data: data?.data
      ? mapApiToClientProfile(
          clientId,
          data.data.clientInfo,
          data.data.visits ?? [],
        )
      : undefined,
    isLoading,
    isError,
  };
};

export const useGetAllClientProfiles = (
  page = 1,
  limit = 10,
): {
  data: Client[] | undefined;
  isLoading: boolean;
  isError: boolean;
} => {
  const { data, isLoading, isError } = useGetAllClientsQuery({ page, limit });

  return {
    data: data?.data,
    isLoading,
    isError,
  };
};
