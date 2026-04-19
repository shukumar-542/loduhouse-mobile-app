import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, FlatList } from "react-native";
import { ChevronDown } from "lucide-react-native";

interface SelectFieldProps {
  value: string;
  placeholder: string;
  options: string[];
  onSelect: (val: string) => void;
}

const SelectField: React.FC<SelectFieldProps> = ({
  value,
  placeholder,
  options,
  onSelect,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Input */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => setOpen(true)}
        className="flex-row items-center justify-between px-4 py-3 bg-black border border-gray-700 rounded-xl"
      >
        <Text className={`text-base ${value ? "text-white" : "text-gray-500"}`}>
          {value || placeholder}
        </Text>

        <ChevronDown color="#9CA3AF" size={20} />
      </TouchableOpacity>

      {/* Modal Dropdown */}
      <Modal visible={open} transparent animationType="fade">
        <TouchableOpacity
          className="flex-1 bg-black/60 justify-center px-6"
          activeOpacity={1}
          onPress={() => setOpen(false)}
        >
          <View className="bg-[#111111] rounded-2xl p-4 border border-gray-800">
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    onSelect(item);
                    setOpen(false);
                  }}
                  className="py-3 border-b border-gray-800"
                >
                  <Text className="text-white text-base">{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default SelectField;