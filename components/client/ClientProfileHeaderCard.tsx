import React from "react";
import { View, Text, Image } from "react-native";

interface ClientProfileHeaderCardProps {
  name: string;
  clientSince: string | number;
  visitCount: number;
  note: string;
  imageUri?: string;
  containerClassName?: string;
}

const ClientProfileHeaderCard: React.FC<ClientProfileHeaderCardProps> = ({
  name,
  clientSince,
  visitCount,
  note,
  imageUri,
  containerClassName,
}) => {
  return (
    <View className={`bg-transparent p-4 w-full ${containerClassName}`}>
      <View className="flex-row items-center mb-5">
        <Image
          source={
            imageUri ? { uri: imageUri } : require("@/assets/images/Avater.png")
          }
          className="w-20 h-20 rounded-full mr-4"
          resizeMode="cover"
        />
        <View className="flex-1 justify-center">
          <Text className="text-2xl font-bold text-white mb-1">{name}</Text>
          <Text className="text-base text-gray-400">
            Client since {clientSince} • {visitCount} visits
          </Text>
        </View>
      </View>

      <View className="border border-gray-700 rounded-xl py-3 px-4 bg-[#101012]">
        <Text className="text-sm text-gray-500 italic" numberOfLines={1}>
          "{note}"
        </Text>
      </View>
    </View>
  );
};

export default ClientProfileHeaderCard;
