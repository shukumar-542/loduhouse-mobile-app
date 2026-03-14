import React from "react";
import { Pressable, Text, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ShoppingCart } from "lucide-react-native";

interface SubscriptionButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

export const SubscriptionButton: React.FC<SubscriptionButtonProps> = ({
  label,
  onPress,
  disabled = false,
}) => {
  const gradientColors: readonly [string, string] = disabled
    ? ["#E5E5E5", "#E5E5E5"]
    : ["#C9A367", "rgba(208,170,105,0.7)"];

  return (
    <Pressable
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      className="w-full rounded-2xl overflow-hidden my-2"
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
          flexDirection: "row",
        }}
      >
        <ShoppingCart
          size={20}
          color={disabled ? "#A3A3A3" : "#FFFFFF"}
          style={{ marginRight: 8 }}
        />
        <Text
          className={`text-base font-semibold ${
            disabled ? "text-gray-500" : "text-white"
          }`}
        >
          {label}
        </Text>
      </LinearGradient>
    </Pressable>
  );
};

export default SubscriptionButton;