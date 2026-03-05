import { useState, useCallback } from "react";
import { MediaItem } from "@/components/shared/UniversalMediaPicker";
// ─── Types ────────────────────────────────────────────────────
export interface VisitFormData {
  tags: string[];
  media: MediaItem[];
  serviceNotes: string;
  personalNotes: string;
  duration: string;
  selectedDate: Date | null;
  servicePrice: string;
  tip: string;
}

// Use a mapped union so setField is assignable across component boundaries
// without hitting the generic callback variance issue in TypeScript.
export type SetVisitField = (
  key: keyof VisitFormData,
  value: VisitFormData[keyof VisitFormData],
) => void;

export interface UseAddNewVisitReturn {
  formData: VisitFormData;
  setField: SetVisitField;
  submitVisit: () => void;
  isSubmitting: boolean;
  toastMessage: string | null;
  toastType: "success" | "error" | "warning" | "info";
  clearToast: () => void;
}

// ─── Validation ───────────────────────────────────────────────
const validateFormData = (data: VisitFormData): string | null => {
  if (!data.tags || data.tags.length === 0)
    return "Please select at least one service type.";
  if (!data.selectedDate) return "Please select a visit date.";
  if (
    !data.servicePrice ||
    isNaN(parseFloat(data.servicePrice)) ||
    parseFloat(data.servicePrice) <= 0
  )
    return "Please enter a valid service price.";
  if (data.duration && isNaN(parseFloat(data.duration)))
    return "Please enter a valid duration.";
  if (data.tip && isNaN(parseFloat(data.tip)))
    return "Please enter a valid tip amount.";
  return null;
};

// ─── Hook ─────────────────────────────────────────────────────
const useAddNewVisit = (): UseAddNewVisitReturn => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastType, setToastType] = useState<
    "success" | "error" | "warning" | "info"
  >("info");

  const [formData, setFormData] = useState<VisitFormData>({
    tags: [],
    media: [],
    serviceNotes: "",
    personalNotes: "",
    duration: "",
    selectedDate: null,
    servicePrice: "",
    tip: "",
  });

  // Cast inside the impl so the public signature stays clean
  const setField = useCallback<SetVisitField>((key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value as VisitFormData[typeof key],
    }));
  }, []);

  const clearToast = useCallback(() => setToastMessage(null), []);

  const submitVisit = useCallback(() => {
    setIsSubmitting(true);

    const validationError = validateFormData(formData);

    if (validationError) {
      console.warn("[useAddNewVisit] Validation failed:", validationError);
      setToastType("error");
      setToastMessage(validationError);
      setIsSubmitting(false);
      return;
    }

    const payload = {
      ...formData,
      selectedDate: formData.selectedDate?.toISOString(),
      servicePrice: parseFloat(formData.servicePrice),
      tip: formData.tip ? parseFloat(formData.tip) : 0,
      duration: formData.duration ? parseFloat(formData.duration) : null,
      mediaCount: formData.media.length,
    };

    setToastType("success");
    setToastMessage("Visit saved successfully!");
    setIsSubmitting(false);
  }, [formData]);

  return {
    formData,
    setField,
    submitVisit,
    isSubmitting,
    toastMessage,
    toastType,
    clearToast,
  };
};

export default useAddNewVisit;
