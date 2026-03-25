import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Star, MapPin } from "lucide-react-native";
import img from "../../assets/images/booking1.png";

interface BookingCardProps {
  // You can add props like studio name, description, price, rating, etc.
  title : string;
  description : string;
  price : number;
  rating : number;
  location : string;
  image : any;
  reviews? : number;
  onPress : () => void;
}

const BookingCard = ({
    title, description, price, rating, location, image, reviews, onPress
} : BookingCardProps) => {
  return (
    <View className="bg-[#0B0B0F] border border-gray-800 rounded-3xl p-2 mb-5 mt-4">
      
      {/* Image Section */}
      <View className="w-full h-52 rounded-2xl overflow-hidden">
        <Image source={image} className="w-full h-full" resizeMode="cover" />

        {/* Price Badge */}
        <View className="absolute bottom-3 left-3 bg-[#5B2EFF] px-3 py-1 rounded-lg">
          <Text className="text-white font-semibold">{price}</Text>
        </View>

        {/* Rating Badge */}
        <View className="absolute top-3 right-3 bg-[#111111] px-2 py-1 rounded-lg flex-row items-center">
          <Star size={14} color="#FACC15" fill="#FACC15" />
          <Text className="text-white text-xs ml-1">{rating}</Text>
        </View>
      </View>

      {/* Content */}
      <View className="my-4 px-4">
        <Text className="text-white text-2xl font-semibold">
          {title}
        </Text>

        <Text className="text-white text-md mt-1">
          {description}
        </Text>

        {/* Location */}
        <View className="flex-row items-center mt-2">
          <MapPin size={14} color="#9CA3AF" />
          <Text className="text-gray-400 text-sm ml-1">
            {location}
          </Text>
        </View>

        {/* Button */}
        <TouchableOpacity className="mt-4 bg-[#5B2EFF] py-4 rounded-xl items-center" onPress={onPress}>
          <Text className="text-white font-semibold">View Studio</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingCard;