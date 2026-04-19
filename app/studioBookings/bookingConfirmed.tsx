import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
import { CheckCircle } from "lucide-react-native";

export default function BookingConfirmed() {

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/artist/home"); 
    }, 5000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-black items-center justify-center px-4">

      {/* Icon */}
      <View className="w-28 h-28 rounded-full bg-[#052e1a] items-center justify-center mb-6">
        <CheckCircle color="#22c55e" size={60} />
      </View>

      {/* Title */}
      <Text className="text-white text-2xl font-semibold mb-2">
        Booking Confirmed!
      </Text>

      {/* Subtitle */}
      <Text className="text-gray-400 text-center">
        Redirecting to your bookings...
      </Text>

    </View>
  );
}