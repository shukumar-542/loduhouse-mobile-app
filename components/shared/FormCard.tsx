import React from "react";
import { View, Text } from "react-native";

interface FormCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const FormCard: React.FC<FormCardProps> = ({ title, icon, children }) => {
  return (
    <View className="mt-6 p-4 bg-[#111111] border border-[#4F4F59] rounded-2xl">
      
      {/* Header */}
      <View className="flex-row items-center gap-2 mb-3">
        {icon && icon}
        <Text className="text-white text-lg font-semibold">
          {title}
        </Text>
      </View>

      {/* Content */}
      <View>{children}</View>
    </View>
  );
};

export default FormCard;