import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, Pressable } from "react-native";
import { X, Tag, SlidersHorizontal } from "lucide-react-native";

interface Props {
  onSearch?: (service: string) => void;
}

const ServiceFilter: React.FC<Props> = ({ onSearch }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState("Haircut");

  const services = ["Haircut", "Beard Trim"];

  const handleSearch = () => {
    onSearch?.(selected);
    setIsVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        className="h-16 w-16 items-center justify-center rounded-2xl border border-[#4F4F59]  bg-[#0F0B18]"
        activeOpacity={0.7}
      >
        <SlidersHorizontal size={22} color="#4b4b54" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        {/* OVERLAY */}
        <Pressable
          className="flex-1 items-center justify-center px-6"
          onPress={() => setIsVisible(false)}
        >
          {/* MODAL CARD (image_03377b.png) */}
          <Pressable
            className="w-full rounded-[32px] border border-[#23232a] bg-[#101012] p-7 shadow-2xl"
            onPress={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <View className="mb-8 flex-row items-center justify-between">
              <View className="flex-row items-center">
                {/* rotate-90 is a standard Tailwind class */}
                <View className="rotate-90">
                  <Tag size={20} color="#FFFFFF" />
                </View>
                <Text className="ml-3 text-xl font-medium text-white">
                  Service Type
                </Text>
              </View>

              <TouchableOpacity onPress={() => setIsVisible(false)}>
                <X size={26} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* CHIPS */}
            <View className="mb-12 flex-row flex-wrap gap-3">
              {services.map((item) => {
                const isActive = selected === item;
                return (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setSelected(item)}
                    className={`rounded-full border px-6 py-2.5 ${
                      isActive
                        ? "border-[#7d6339] bg-[#3d3322]"
                        : "border-[#23232a] bg-transparent"
                    }`}
                  >
                    <Text
                      className={`text-[15px] font-medium ${
                        isActive ? "text-[#c4a46a]" : "text-[#5e5e66]"
                      }`}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* SEARCH BUTTON */}
            <View className="items-end">
              <TouchableOpacity
                onPress={handleSearch}
                className="rounded-full bg-[#c4a46a] px-10 py-3.5 active:bg-[#c4a46a]"
              >
                <Text className="text-base font-bold text-white">Search</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default ServiceFilter;
