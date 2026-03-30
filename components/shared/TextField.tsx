import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";

interface FieldProps {
  placeholder: string;
  value: string;
  onChangeText?: (text: string) => void;
  icon?: React.ReactNode;
  multiline?: boolean;
  editable?: boolean;
}

const Field: React.FC<FieldProps> = ({
  placeholder,
  value,
  onChangeText,
  icon,
  multiline = false,
  editable = true,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className="bg-[#111111] border border-gray-800 rounded-2xl  mb-4">

    

      {/* Input / Textarea */}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#6B7280"
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          text-white px-4 py-4 rounded-xl border
          ${multiline ? "h-28 text-top" : ""}
          ${
            isFocused
              ? "border-[#5B2EFF] bg-[#1A1A1A]"
              : "border-gray-700 bg-black"
          }
        `}
        style={{
          textAlignVertical: multiline ? "top" : "center",
        }}
      />
    </View>
  );
};

export default Field;