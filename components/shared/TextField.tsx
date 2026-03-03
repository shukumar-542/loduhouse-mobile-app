import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";

interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText?: (text: string) => void;
  editable?: boolean;
  className?: string; // additional styling for the TextInput
  disabledClassName?: string; // styling for the container when disabled
}

export const TextField: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
  editable = true,
  className = "",
  disabledClassName = "bg-gray-800 opacity-70", // sensible default
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Determine container background
  let containerBgClass = "";
  if (!editable) {
    containerBgClass = disabledClassName;
  } else if (isFocused) {
    containerBgClass = "bg-[#121217]";
  }

  return (
    <View className="mb-5 w-full">
      <Text className="text-white text-base font-bold mb-2 ml-1">{label}</Text>
      <View
        className={`border border-[#C9A367] rounded-xl px-4 ${containerBgClass}`}
      >
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#fff"
          value={value}
          onChangeText={onChangeText}
          keyboardType="default"
          autoCapitalize="words"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          editable={editable}
          className={`text-white text-base ${className}`}
        />
      </View>
    </View>
  );
};
