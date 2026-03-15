import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { Eye, EyeOff } from "lucide-react-native";

interface PasswordProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const PasswordInput: React.FC<PasswordProps> = ({
  label,
  placeholder,
  value,
  onChangeText,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="mb-6 w-full">
      <Text className="text-white text-base font-bold mb-2 ml-1">{label}</Text>
      <View
        className={`${
          isFocused ? "bg-[#121217]" : ""
        } border border-[#F1F1F2] rounded-xl flex-row items-center px-4`}
      >
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#fff"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 text-white text-base"
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <Eye size={20} color="#fff" />
          ) : (
            <EyeOff size={20} color="#7d848d" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordInput;
