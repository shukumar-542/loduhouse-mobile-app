import React from "react";
import { Pressable, Text, ViewStyle, ColorValue } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface ButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  disabled = false,
}) => {
  // TypeScript-safe color tuple
  const gradientColors: readonly [ColorValue, ColorValue] = disabled
    ? ["#5B2EFF", "#5B2EFF"]
    : ["#5B2EFF", "#5B2EFF"];

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      style={({ pressed }) => [
        { opacity: pressed && !disabled ? 0.8 : 1 } as ViewStyle,
      ]}
    >
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={{
          paddingVertical: 16,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 12,
        }}
      >
        <Text
          style={{
            color: disabled ? "#A3A3A3" : "#FFFFFF",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {label}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};