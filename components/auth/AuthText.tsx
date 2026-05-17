import React from "react";
import { View, Text } from "react-native";

interface AuthTextProps {
  title: string;
  description: string;
}

export const AuthText: React.FC<AuthTextProps> = ({ title, description }) => (
  <View className="items-center mt-5">
    <Text className="text-[28px] font-bold text-[#fff] text-center leading-9 mb-2">
      {title}
    </Text>
    <Text className="text-[#fff] text-base text-center leading-6 font-normal pb-8  w-full">
      {description}
    </Text>
  </View>
);

export default AuthText;
