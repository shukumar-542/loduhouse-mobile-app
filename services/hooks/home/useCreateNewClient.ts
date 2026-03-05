import { useState, useCallback } from "react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const submitClient = useCallback(() => {
    setIsSubmitting(true);

    const validationError = validateFormData(formData);

    if (validationError) {
      console.warn("[useCreateNewClient] Validation failed:", validationError);
      setToastType("error");
      setToastMessage(validationError);
      setIsSubmitting(false);
      return;
    }
    setToastType("success");
    setToastMessage("Client created successfully!");
    setIsSubmitting(false);
  }, [formData]);

  return {
    formData,
    setField,
    submitClient,
    isSubmitting,
    toastMessage,
    toastType,
    clearToast,
  };
};

export default useCreateNewClient;
