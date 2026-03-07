import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image as RNImage,
  Modal,
  ActivityIndicator,
} from "react-native";
import {
  Tag,
  Image,
  ClipboardList,
  User,
  Clock,
  Calendar,
  X,
  Plus,
  Check,
  ChevronLeft,
  ChevronRight,
  LucideIcon,
} from "lucide-react-native";
import UniversalMediaPicker, {
  MediaItem,
} from "../shared/UniversalMediaPicker";
import {
  VisitFormData,
  SetVisitField,
} from "@/services/hooks/home/useAddNewVisit";
import { useGetServiceTypes } from "@/services/hooks/visits/useGetServicesTypes";

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// ─── Section Header ───────────────────────────────────────────
interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
}
const SectionHeader: React.FC<SectionHeaderProps> = ({ icon: Icon, title }) => (
  <View className="flex-row items-center mb-3 mt-5">
    <Icon size={18} color="#94a3b8" />
    <Text className="text-white font-semibold ml-2 text-base">{title}</Text>
  </View>
);

// ─── Inline Calendar ──────────────────────────────────────────
interface InlineCalendarProps {
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}
const InlineCalendar: React.FC<InlineCalendarProps> = ({
  selectedDate,
  onDateSelect,
}) => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };
  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(viewYear, viewMonth, 0).getDate();

  type CellType = "prev" | "current" | "next";
  interface CalendarCell {
    day: number;
    type: CellType;
  }

  const cells: CalendarCell[] = [];
  for (let i = firstDayOfMonth - 1; i >= 0; i--)
    cells.push({ day: daysInPrevMonth - i, type: "prev" });
  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ day: d, type: "current" });
  const remainder = cells.length % 7;
  if (remainder !== 0)
    for (let d = 1; d <= 7 - remainder; d++)
      cells.push({ day: d, type: "next" });

  const isSelected = (day: number, type: CellType): boolean =>
    !!selectedDate &&
    type === "current" &&
    selectedDate.getFullYear() === viewYear &&
    selectedDate.getMonth() === viewMonth &&
    selectedDate.getDate() === day;

  const isToday = (day: number, type: CellType): boolean =>
    type === "current" &&
    today.getFullYear() === viewYear &&
    today.getMonth() === viewMonth &&
    today.getDate() === day;

  const handleDayPress = (day: number, type: CellType) => {
    if (type === "prev") {
      const m = viewMonth === 0 ? 11 : viewMonth - 1;
      const y = viewMonth === 0 ? viewYear - 1 : viewYear;
      onDateSelect(new Date(y, m, day));
      setViewMonth(m);
      setViewYear(y);
    } else if (type === "next") {
      const m = viewMonth === 11 ? 0 : viewMonth + 1;
      const y = viewMonth === 11 ? viewYear + 1 : viewYear;
      onDateSelect(new Date(y, m, day));
      setViewMonth(m);
      setViewYear(y);
    } else {
      onDateSelect(new Date(viewYear, viewMonth, day));
    }
  };

  const rows: CalendarCell[][] = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));

  return (
    <View
      style={{
        backgroundColor: "#101012",
        borderWidth: 1,
        borderColor: "#4F4F59",
        borderRadius: 16,
        padding: 16,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <TouchableOpacity
          onPress={goToPrevMonth}
          style={{
            padding: 6,
            backgroundColor: "#1a1a22",
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#4F4F59",
          }}
        >
          <ChevronLeft size={16} color="#94a3b8" />
        </TouchableOpacity>
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>
          {MONTHS[viewMonth]} {viewYear}
        </Text>
        <TouchableOpacity
          onPress={goToNextMonth}
          style={{
            padding: 6,
            backgroundColor: "#1a1a22",
            borderRadius: 8,
            borderWidth: 1,
            borderColor: "#4F4F59",
          }}
        >
          <ChevronRight size={16} color="#94a3b8" />
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", marginBottom: 8 }}>
        {DAYS_OF_WEEK.map((d) => (
          <View key={d} style={{ flex: 1, alignItems: "center" }}>
            <Text style={{ color: "#C9A367", fontSize: 11, fontWeight: "600" }}>
              {d}
            </Text>
          </View>
        ))}
      </View>
      {rows.map((row, rowIdx) => (
        <View key={rowIdx} style={{ flexDirection: "row", marginBottom: 4 }}>
          {row.map((cell, cellIdx) => {
            const selected = isSelected(cell.day, cell.type);
            const todayCell = isToday(cell.day, cell.type);
            const dimmed = cell.type !== "current";
            return (
              <TouchableOpacity
                key={cellIdx}
                onPress={() => handleDayPress(cell.day, cell.type)}
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 7,
                  marginHorizontal: 1,
                  borderRadius: 8,
                  backgroundColor: selected
                    ? "#C9A367"
                    : todayCell
                      ? "#1e1c2a"
                      : "transparent",
                  borderWidth: todayCell && !selected ? 1 : 0,
                  borderColor: "#C9A367",
                }}
              >
                <Text
                  style={{
                    color: selected ? "#fff" : dimmed ? "#3a3a50" : "#e2e8f0",
                    fontSize: 13,
                    fontWeight: selected || todayCell ? "700" : "400",
                  }}
                >
                  {cell.day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      ))}
      {selectedDate && (
        <View
          style={{
            marginTop: 12,
            paddingTop: 12,
            borderTopWidth: 1,
            borderTopColor: "#2a2a35",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <Calendar size={13} color="#C9A367" />
          <Text style={{ color: "#C9A367", fontSize: 12, fontWeight: "600" }}>
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Text>
        </View>
      )}
    </View>
  );
};

// ─── Form Props ───────────────────────────────────────────────
export interface AddNewVisitFormProps {
  formData: VisitFormData;
  setField: SetVisitField;
}

// ─── Main Form ────────────────────────────────────────────────
const AddNewVisitForm: React.FC<AddNewVisitFormProps> = ({
  formData,
  setField,
}) => {
  const [customTags, setCustomTags] = useState<string[]>([]);
  const [tagModalVisible, setTagModalVisible] = useState(false);
  const [newTagInput, setNewTagInput] = useState("");

  const { serviceTypes, isLoading: serviceTypesLoading } = useGetServiceTypes();

  // ─── Tags ─────────────────────────────────────────────────────
  const toggleTag = (tag: string) => {
    const updated = formData.tags.includes(tag)
      ? formData.tags.filter((t: string) => t !== tag)
      : [...formData.tags, tag];
    setField("tags", updated);
  };

  const addCustomTag = () => {
    const trimmed = newTagInput.trim();
    if (!trimmed) return;
    if ([...serviceTypes, ...customTags].includes(trimmed)) {
      Alert.alert("Tag already exists", `"${trimmed}" is already in the list.`);
      return;
    }
    setCustomTags((prev) => [...prev, trimmed]);
    setField("tags", [...formData.tags, trimmed]);
    setNewTagInput("");
    setTagModalVisible(false);
  };

  const removeCustomTag = (tag: string) => {
    setCustomTags((prev) => prev.filter((t: string) => t !== tag));
    setField(
      "tags",
      formData.tags.filter((t: string) => t !== tag),
    );
  };

  // ─── Media ────────────────────────────────────────────────────
  const handleMediaPicked = (newItems: MediaItem[]) => {
    const existingUris = new Set(formData.media.map((m: MediaItem) => m.uri));
    const fresh = newItems.filter(
      (item: MediaItem) => !existingUris.has(item.uri),
    );
    setField("media", [...formData.media, ...fresh]);
  };

  const removeMedia = (uri: string) => {
    setField(
      "media",
      formData.media.filter((m: MediaItem) => m.uri !== uri),
    );
  };

  const allTags = [...serviceTypes, ...customTags];

  return (
    <View className="flex-1 bg-[#0F0D17] px-5">
      {/* ── Service Type ── */}
      <SectionHeader icon={Tag} title="Service Type" />
      {serviceTypesLoading ? (
        <ActivityIndicator
          size="small"
          color="#C9A367"
          style={{ alignSelf: "flex-start", marginVertical: 8 }}
        />
      ) : (
        <View className="flex-row flex-wrap gap-2">
          {allTags.map((tag) => {
            const isSelected = formData.tags.includes(tag);
            const isCustom = customTags.includes(tag);
            return (
              <View key={tag} className="flex-row items-center">
                <TouchableOpacity
                  onPress={() => toggleTag(tag)}
                  className={`flex-row items-center px-4 py-2 rounded-full border ${isSelected ? "bg-[#C9A367] border-[#C9A367]" : "bg-[#101012] border-[#4F4F59]"}`}
                >
                  {isSelected && (
                    <Check size={13} color="#fff" style={{ marginRight: 5 }} />
                  )}
                  <Text className="text-white">{tag}</Text>
                </TouchableOpacity>
                {isCustom && (
                  <TouchableOpacity
                    onPress={() => removeCustomTag(tag)}
                    className="ml-1 bg-[#2a2a35] rounded-full p-1"
                  >
                    <X size={11} color="#94a3b8" />
                  </TouchableOpacity>
                )}
              </View>
            );
          })}
          <TouchableOpacity
            onPress={() => setTagModalVisible(true)}
            className="flex-row items-center border border-dashed border-[#4F4F59] px-4 py-2 rounded-full"
          >
            <Plus size={14} color="#94a3b8" />
            <Text className="text-slate-500 ml-1">Custom Tag</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* ── Media ── */}
      <SectionHeader icon={Image} title="Media" />
      <View className="flex-row flex-wrap gap-3">
        <UniversalMediaPicker onMediaPicked={handleMediaPicked} />
        {formData.media.map((item: MediaItem) => (
          <View key={item.uri} className="relative">
            <RNImage
              source={{ uri: item.uri }}
              className="w-20 h-20 rounded-xl"
              resizeMode="cover"
            />
            {item.type === "video" && (
              <View className="absolute bottom-1 left-1 bg-black/60 rounded px-1">
                <Text className="text-white text-[9px]">VID</Text>
              </View>
            )}
            <TouchableOpacity
              onPress={() => removeMedia(item.uri)}
              className="absolute -top-2 -right-2 bg-red-500 rounded-full p-0.5"
            >
              <X size={13} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* ── Service Notes ── */}
      <SectionHeader icon={ClipboardList} title="Service Notes" />
      <TextInput
        className="bg-[#101012] border border-[#4F4F59] rounded-xl p-4 text-white h-24"
        placeholder="Formulas used, guard sizes, techniques..."
        placeholderTextColor="#4A4A5A"
        multiline
        textAlignVertical="top"
        value={formData.serviceNotes}
        onChangeText={(v: string) => setField("serviceNotes", v)}
      />

      {/* ── Personal Notes ── */}
      <SectionHeader icon={User} title="Personal Notes" />
      <TextInput
        className="bg-[#101012] border border-[#4F4F59] rounded-xl p-4 text-white h-24"
        placeholder="Life updates, upcoming events, hobbies..."
        placeholderTextColor="#4A4A5A"
        multiline
        textAlignVertical="top"
        value={formData.personalNotes}
        onChangeText={(v: string) => setField("personalNotes", v)}
      />

      {/* ── Duration ── */}
      <SectionHeader icon={Clock} title="Duration" />
      <TextInput
        className="bg-[#101012] border border-[#4F4F59] rounded-xl p-4 text-white"
        placeholder="0.00"
        placeholderTextColor="#4A4A5A"
        keyboardType="numeric"
        value={formData.duration}
        onChangeText={(v: string) => setField("duration", v)}
      />

      {/* ── Date ── */}
      <SectionHeader icon={Calendar} title="Date" />
      <InlineCalendar
        selectedDate={formData.selectedDate}
        onDateSelect={(date: Date) => setField("selectedDate", date)}
      />

      {/* ── Price & Tip ── */}
      <View className="flex-row gap-4 mt-5">
        <View className="flex-1">
          <Text className="text-white font-semibold mb-2">Service Price</Text>
          <TextInput
            className="bg-[#101012] border border-[#4F4F59] rounded-xl p-4 text-white"
            placeholder="$0.00"
            placeholderTextColor="#4A4A5A"
            keyboardType="numeric"
            value={formData.servicePrice}
            onChangeText={(v: string) => setField("servicePrice", v)}
          />
        </View>
        <View className="flex-1">
          <Text className="text-white font-semibold mb-2">Tip</Text>
          <TextInput
            className="bg-[#101012] border border-[#4F4F59] rounded-xl p-4 text-white"
            placeholder="$0.00"
            placeholderTextColor="#4A4A5A"
            keyboardType="numeric"
            value={formData.tip}
            onChangeText={(v: string) => setField("tip", v)}
          />
        </View>
      </View>

      <View className="h-4" />

      {/* ── Custom Tag Modal ── */}
      <Modal
        visible={tagModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setTagModalVisible(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => setTagModalVisible(false)}
          className="flex-1 bg-black/60 justify-center items-center px-6"
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => {}}
            className="w-full bg-[#101012] border border-[#4F4F59] rounded-2xl p-5"
          >
            <Text className="text-white text-lg font-semibold mb-4">
              Add Custom Tag
            </Text>
            <TextInput
              autoFocus
              className="bg-[#101012] border border-[#4F4F59] rounded-xl px-4 py-3 text-white mb-4"
              placeholder="e.g. Highlight, Toner, Perm..."
              placeholderTextColor="#4A4A5A"
              value={newTagInput}
              onChangeText={setNewTagInput}
              onSubmitEditing={addCustomTag}
              returnKeyType="done"
              maxLength={30}
            />
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={() => {
                  setTagModalVisible(false);
                  setNewTagInput("");
                }}
                className="flex-1 border border-[#4F4F59] rounded-xl py-3 items-center"
              >
                <Text className="text-slate-400">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={addCustomTag}
                className="flex-1 bg-[#C9A367] rounded-xl py-3 items-center"
              >
                <Text className="text-white font-semibold">Add Tag</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default AddNewVisitForm;
