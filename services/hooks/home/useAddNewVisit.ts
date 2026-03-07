import { useState, useCallback } from "react";
import { MediaItem } from "@/components/shared/UniversalMediaPicker";
import { useAddVisitMutation } from "@/services/api/visitsApi";

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

export type SetVisitField = (
  key: keyof VisitFormData,
  value: VisitFormData[keyof VisitFormData],
) => void;

export interface UseAddNewVisitReturn {
  formData: VisitFormData;
  setField: SetVisitField;
  submitVisit: (clientId: string) => Promise<void>;
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
  const [addVisit, { isLoading: isSubmitting }] = useAddVisitMutation();

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

  const setField = useCallback<SetVisitField>((key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value as VisitFormData[typeof key],
    }));
  }, []);

  const clearToast = useCallback(() => setToastMessage(null), []);

  const submitVisit = useCallback(
    async (clientId: string) => {
      const validationError = validateFormData(formData);
      if (validationError) {
        setToastType("error");
        setToastMessage(validationError);
        return;
      }

      try {
        const photos = formData.media
          .filter((m) => m.type === "photo")
          .map((m) => ({
            uri: m.uri,
            name: m.uri.split("/").pop() ?? `photo_${Date.now()}.jpg`,
            type: "image/jpeg",
          }));

        const videos = formData.media
          .filter((m) => m.type === "video")
          .map((m) => ({
            uri: m.uri,
            name: m.uri.split("/").pop() ?? `video_${Date.now()}.mp4`,
            type: "video/mp4",
          }));

        // Strictly format as YYYY-MM-DD regardless of whether selectedDate
        // is a Date object or an ISO string (e.g. "2026-03-19T18:00:00.000Z")
        const date = formData.selectedDate
          ? new Date(formData.selectedDate).toLocaleDateString("en-CA") // en-CA = YYYY-MM-DD
          : undefined;

        await addVisit({
          clientId,
          serviceType: formData.tags.join(", "),
          photos: photos.length > 0 ? photos : undefined,
          videos: videos.length > 0 ? videos : undefined,
          serviceNotes: formData.serviceNotes || undefined,
          personalNotes: formData.personalNotes || undefined,
          duration: formData.duration || undefined,
          date,
          servicePrice: formData.servicePrice,
          tips: formData.tip || undefined,
        }).unwrap();

        setToastType("success");
        setToastMessage("Visit saved successfully!");
      } catch (err: any) {
   
        const message =
          err?.data?.message ?? err?.message ?? "Failed to save visit.";
        setToastType("error");
        setToastMessage(message);
      }
    },
    [formData, addVisit],
  );

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
