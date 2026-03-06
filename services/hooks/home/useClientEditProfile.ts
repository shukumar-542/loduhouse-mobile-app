import { useState } from "react";
import { useUpdateClientMutation } from "@/services/api/clientsApi";

export interface ClientEditProfilePayload {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  notes: string;
  image: string;
}

export const useClientEditProfile = () => {
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [updateClient, { isLoading }] = useUpdateClientMutation();

  const editProfile = async (
    payload: ClientEditProfilePayload,
  ): Promise<{ success: boolean }> => {
    setError(null);
    setSuccessMessage(null);

    try {
      const isLocalFile = payload.image && !payload.image.startsWith("http");

      await updateClient({
        id: payload.id,
        fullName: payload.fullName,
        pnoneNumber: payload.phoneNumber,
        email: payload.email,
        notes: payload.notes,
        ...(isLocalFile && {
          picture: {
            uri: payload.image,
            name: `profile_${payload.id}.jpg`,
            type: "image/jpeg",
          },
        }),
      }).unwrap();

      setSuccessMessage("Client updated successfully.");
      return { success: true };
    } catch (err: any) {
      const message =
        err?.data?.message ??
        err?.message ??
        "Something went wrong. Please try again.";
      setError(message);
      return { success: false };
    }
  };

  return {
    editProfile,
    successMessage,
    error,
    isLoading,
  } as {
    editProfile: (
      payload: ClientEditProfilePayload,
    ) => Promise<{ success: boolean }>;
    successMessage: string | null;
    error: string | null;
    isLoading: boolean;
  };
};
