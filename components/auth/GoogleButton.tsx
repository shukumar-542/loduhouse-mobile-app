import React from "react";
import {
  TouchableOpacity,
  Text,
  Image,
  View,
  ActivityIndicator,
} from "react-native";
import { SvgProps } from "react-native-svg";

interface SocialButtonProps {
  SvgComponent?: React.FC<SvgProps>;
  imageSrc?: any;
  label: string;
  onPress: () => void;
  disabled?: boolean;
}

export const GoogleButton: React.FC<SocialButtonProps> = ({
  SvgComponent,
  imageSrc,
  label,
  onPress,
  disabled = false,
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
    activeOpacity={0.7}
    className={`flex-row items-center justify-center w-full py-4 rounded-3xl border border-[#4F4F59] ${
      disabled ? "bg-[#2a2214] opacity-60" : "bg-[#172434]"
    }`}
  >
    <View className="flex items-center justify-center mr-3">
      {disabled ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : SvgComponent ? (
        <SvgComponent width={24} height={24} />
      ) : (
        <Image
          source={imageSrc}
          style={{ width: 24, height: 24 }}
          resizeMode="contain"
        />
      )}
    </View>
    <Text className="text-white text-base font-bold">{label}</Text>
  </TouchableOpacity>
);

export default GoogleButton;
