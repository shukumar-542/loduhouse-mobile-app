import { View, Text } from "react-native";

const StatCard = ({ icon, value, label, color }: any) => {
  return (
    <View className="flex-1 bg-[#111111] border border-gray-800 rounded-2xl p-4 items-center">

      {/* Icon */}
      <View className="mb-2">
        {icon}
      </View>

      {/* Value */}
      <Text className="text-white text-xl font-semibold">
        {value}
      </Text>

      {/* Label */}
      <Text className="text-gray-400 text-sm mt-1">
        {label}
      </Text>

    </View>
  );
};

export default StatCard;