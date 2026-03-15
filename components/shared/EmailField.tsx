import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";

interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export const EmailInput: React.FC<InputProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="mb-5 w-full">
      <Text className="text-white text-base font-bold mb-2 ml-1">{label}</Text>
      <View
        className={`${
          isFocused ? "bg-[#121217]" : ""
        } border border-[#F1F1F2] rounded-xl px-4`}
      >
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#fff"
          value={value}
          onChangeText={onChangeText}
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="text-white text-base"
        />
      </View>
    </View>
  );
};
