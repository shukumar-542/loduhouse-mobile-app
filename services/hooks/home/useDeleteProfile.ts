import { useDeleteClientMutation } from "@/services/api/clientsApi";

export const useDeleteProfile = () => {
  const [deleteClient, { isLoading, error }] = useDeleteClientMutation();

  const deleteProfile = async (id: string): Promise<{ success: boolean }> => {
    try {
      await deleteClient(id).unwrap();
      return { success: true };
    } catch (err: any) {
      return { success: false };
    }
  };

  return {
    deleteProfile,
    isLoading,
    error: error
      ? ((error as any)?.data?.message ?? "Failed to delete client.")
      : null,
  };
};
