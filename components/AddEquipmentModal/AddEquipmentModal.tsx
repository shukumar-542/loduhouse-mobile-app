import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useState } from "react";
import { X, ChevronDown } from "lucide-react-native";

const CATEGORIES = [
  "Microphone",
  "Audio Interface",
  "Headphones",
  "Studio Monitor",
  "MIDI Controller",
  "Mixer",
  "Other",
];

type Props = {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string, category: string) => void;
};

export default function AddEquipmentModal({ visible, onClose, onAdd }: Props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Microphone");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAdd = () => {
    if (!name.trim()) return;
    onAdd(name.trim(), category);
    setName("");
    setCategory("Microphone");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      {/* Backdrop */}
      <TouchableOpacity
        className="flex-1 bg-black/60 justify-center px-6"
        activeOpacity={1}
        onPress={onClose}
      >
        {/* Card */}
        <TouchableOpacity activeOpacity={1} onPress={() => setShowDropdown(false)}>
          <View className="bg-zinc-900 rounded-2xl p-5">
            {/* Header */}
            <View className="flex-row items-center justify-between mb-5">
              <Text className="text-white text-lg font-bold">Add Equipment</Text>
              <TouchableOpacity onPress={onClose}>
                <X color="#9ca3af" size={20} />
              </TouchableOpacity>
            </View>

            {/* Equipment Name */}
            <Text className="text-white text-sm mb-1.5">
              Equipment Name <Text className="text-red-400">*</Text>
            </Text>
            <TextInput
              className="bg-zinc-800 text-white rounded-xl px-4 py-3 text-sm mb-4"
              placeholder="e.g. Neumann U87"
              placeholderTextColor="#6b7280"
              value={name}
              onChangeText={setName}
            />

            {/* Category Dropdown */}
            <Text className="text-white text-sm mb-1.5">Category</Text>
            <TouchableOpacity
              className="bg-zinc-800 rounded-xl px-4 py-3 flex-row items-center justify-between mb-6"
              onPress={() => setShowDropdown((v) => !v)}
            >
              <Text className="text-white text-sm">{category}</Text>
              <ChevronDown color="#9ca3af" size={18} />
            </TouchableOpacity>

            {/* Dropdown List */}
            {showDropdown && (
              <View className="bg-zinc-800 rounded-xl mb-4 overflow-hidden -mt-5">
                {CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat}
                    className={`px-4 py-3 ${
                      cat === category ? "bg-indigo-600" : ""
                    }`}
                    onPress={() => {
                      setCategory(cat);
                      setShowDropdown(false);
                    }}
                  >
                    <Text className="text-white text-sm">{cat}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Buttons */}
            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={onClose}
                className="flex-1 bg-zinc-700 rounded-xl py-3 items-center"
              >
                <Text className="text-white text-sm font-medium">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleAdd}
                className="flex-1 bg-indigo-600 rounded-xl py-3 items-center"
              >
                <Text className="text-white text-sm font-semibold">Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}