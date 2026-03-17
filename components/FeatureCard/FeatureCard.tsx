import { View, Text } from "react-native";
import { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  icon: ReactNode;
}

export const FeatureCard = ({ title, description, icon }: Props) => {
  return (
    <View className="flex-row items-center p-4 rounded-2xl border border-gray-700 bg-[#111111]">
      
      <View className="w-12 h-12 rounded-xl bg-[#201741] items-center justify-center mr-4">
        {icon}
      </View>

      <View>
        <Text className="text-white text-base font-semibold">
          {title}
        </Text>
        <Text className="text-gray-400 text-sm">
          {description}
        </Text>
      </View>

    </View>
  );
};