import { useState, useCallback } from "react";
import { useCreateClientMutation } from "@/services/api/clientsApi";

// ─── Types ────────────────────────────────────────────────────

export interface ClientFormData {
  photo: string | null;
  fullName: string;
  phoneNumber: string;
  email: string;
  notes: string;
}

export type SetClientField = (
  key: keyof ClientFormData,
  value: ClientFormData[keyof ClientFormData],
) => void;

export interface UseCreateNewClientReturn {
  formData: ClientFormData;
  setField: SetClientField;
  submitClient: () => void;
  isSubmitting: boolean;
  toastMessage: string | null;
  toastType: "success" | "error" | "warning" | "info";
  clearToast: () => void;
}

// ─── Validation ───────────────────────────────────────────────

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateFormData = (data: ClientFormData): string | null => {
  if (!data.fullName.trim()) return "Please enter the client's full name.";
  if (!data.phoneNumber.trim()) return "Please enter a phone number.";
  if (data.email.trim() && !EMAIL_REGEX.test(data.email.trim()))
    return "Please enter a valid email address.";
  return null;
};

// ─── Hook ─────────────────────────────────────────────────────

const useCreateNewClient = (): UseCreateNewClientReturn => {
  const [createClient, { isLoading }] = useCreateClientMutation();

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<
    "success" | "error" | "warning" | "info"
  >("info");

  const [formData, setFormData] = useState<ClientFormData>({
    photo: null,
    fullName: "",
    phoneNumber: "",
    email: "",
    notes: "",
  });

  const setField = useCallback<SetClientField>((key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value as ClientFormData[typeof key],
    }));
  }, []);

  const clearToast = useCallback(() => setToastMessage(null), []);

  const submitClient = useCallback(async () => {
    const validationError = validateFormData(formData);
    if (validationError) {
      setToastType("error");
      setToastMessage(validationError);
      return;
    }

    try {
      const payload: Parameters<typeof createClient>[0] = {
        fullName: formData.fullName.trim(),
        phoneNumber: formData.phoneNumber.trim(),
        email: formData.email.trim(),
        notes: formData.notes.trim(),
      };

      if (formData.photo) {
        const fileName = formData.photo.split("/").pop() ?? "photo.jpg";
        const fileExt = fileName.split(".").pop()?.toLowerCase() ?? "jpg";
        const mimeType = fileExt === "png" ? "image/png" : "image/jpeg";

        payload.picture = {
          uri: formData.photo,
          name: fileName,
          type: mimeType,
        };
      }

      await createClient(payload).unwrap();

      setToastType("success");
      setToastMessage("Client created successfully!");
    } catch (error: any) {
      const message =
        error?.data?.message ?? "Something went wrong. Please try again.";
      setToastType("error");
      setToastMessage(message);
    }
  }, [formData, createClient]);

  return {
    formData,
    setField,
    submitClient,
    isSubmitting: isLoading,
    toastMessage,
    toastType,
    clearToast,
  };
};

export default useCreateNewClient;
