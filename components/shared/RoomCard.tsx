import { Users } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";

const RoomCard = ({ item, selectedId, onSelect }: any) => {
  const isSelected = selectedId === item.id;

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => onSelect(item.id)}
      className={`
        p-4 rounded-2xl border mb-3
        ${isSelected ? "border-[#5B2EFF] bg-[#1A1625]" : "border-gray-800 bg-black"}
      `}
    >
      {/* Header */}
      <View className="flex-row justify-between items-center">
        <Text className="text-white font-semibold text-lg">
          {item.name}
        </Text>

        {isSelected && (
          <View className="w-5 h-5 rounded-full bg-[#5B2EFF] items-center justify-center">
            <View className="w-2 h-2 bg-white rounded-full" />
          </View>
        )}
      </View>

      {/* Type */}
      <Text className="text-gray-400 text-sm mt-1">
        {item.type}
      </Text>

      {/* Capacity */}
      <Text className="text-[#5B2EFF] text-sm mt-2">
        <Users color="#5B2EFF" /> {item.capacity}
      </Text>

      {/* Features */}
      <View className="flex-col flex-wrap gap-2 mt-3">
        {item.features.map((f: string, index: number) => (
          <View
            key={index}
            className="px-3 py-1 border border-gray-700 rounded-full"
          >
            <Text className="text-gray-300 text-xs">{f}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
};

export default RoomCard;