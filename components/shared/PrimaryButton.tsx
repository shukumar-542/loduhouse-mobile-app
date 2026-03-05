import React from "react";
import { Text, TouchableOpacity, ViewStyle } from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface PrimaryButtonProps {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.85}>
      <LinearGradient
        colors={["#C9A367", "rgba(208,170,105,0.7)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className="w-full py-4 rounded-xl overflow-hidden items-center justify-center"
        style={{
          shadowColor: "#C9A367",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 8,
          elevation: 0, // ✅ removes black Android shadow
        }}
      >
        <Text className="text-white font-bold text-lg">{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};
