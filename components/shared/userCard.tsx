import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { ChevronRight } from "lucide-react-native";
import { TouchableOpacity } from "react-native";
interface UserCardProps {
  name: string;
  lastService: string;
  imageUri: string;
  onPress?: () => void;
}

const UserCard = ({ name, lastService, imageUri, onPress }: UserCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between bg-[#18181B] p-2 rounded-2xl border border-[#4F4F59] mt-4 active:opacity-70"
    >
      <View className="flex-row items-center">
        {/* Profile Image */}
        <Image
          source={
            imageUri
              ? { uri: imageUri }
              : require("@/assets/images/Avater.png")
          }
          className="w-16 h-16 rounded-full mr-4"
          resizeMode="cover"
        />

        {/* Text Details */}
        <View>
          <Text className="text-white text-xl font-semibold leading-tight">
            {name}
          </Text>
          <Text className="text-[#666666] text-base mt-1">
            Last: {lastService}
          </Text>
        </View>
      </View>

      {/* Right Arrow Icon */}
      <View className="opacity-40">
        <ChevronRight color="#fff" size={24} strokeWidth={1.5} />
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;
