import React from "react";
import { View, Text } from "react-native";

interface StatCardProps {
  label: string;
  value: string | number;
}

const StatCard = ({ label, value }: StatCardProps) => {
  return (
    <View className="p-4 border-[1px] border-[#4F4F59] rounded-2xl w-[48%]">
      <Text className="text-zinc-500 text-sm font-medium mb-1">{label}</Text>
      <Text className="text-white text-2xl font-semibold">{value}</Text>
    </View>
  );
};

export default StatCard;
