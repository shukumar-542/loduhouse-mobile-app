import { View, Text, TouchableOpacity, Image } from "react-native";
import { Shuffle, Star } from "lucide-react-native";

const EngineerCard = ({ item, selectedId, onSelect }: any) => {
  const isSelected = selectedId === item.id;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onSelect(item.id)}
      className={`
        flex-row items-center p-4 rounded-2xl border mb-3
        ${isSelected ? "border-[#5B2EFF] bg-[#1A1625]" : "border-gray-800 bg-black"}
      `}
    >
      {/* Image / Icon */}
      {item.image ? (
        <Image
          source={item.image}
          className="w-12 h-12 rounded-full mr-3"
        />
      ) : (
        <View className="w-12 h-12 rounded-full bg-[#5B2EFF] items-center justify-center mr-3">
          <Text className="text-white text-lg"><Shuffle color={"#ffff"}/></Text>
        </View>
      )}

      {/* Info */}
      <View className="flex-1">
        <View className="flex-row items-center gap-2">
          <Text className="text-white font-semibold text-base">
            {item.name}
          </Text>

          {item.rating && (
            <View className="flex-row items-center gap-1">
              <Star size={14} color="#FACC15" fill="#FACC15" />
              <Text className="text-yellow-400 text-sm">
                {item.rating}
              </Text>
            </View>
          )}
        </View>

        <Text className="text-gray-400 text-sm mt-1">
          {item.desc}
        </Text>

        {item.experience && (
          <Text className="text-[#5B2EFF] text-sm mt-1">
            {item.experience}
          </Text>
        )}
      </View>

      {/* Radio */}
      {isSelected && (
        <View className="w-5 h-5 rounded-full bg-[#5B2EFF] items-center justify-center">
          <View className="w-2 h-2 bg-white rounded-full" />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default EngineerCard;