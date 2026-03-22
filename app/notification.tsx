import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ArrowLeft, Calendar, DollarSign } from "lucide-react-native";
import { router } from "expo-router";

const NotificationCard = ({ icon, title, description, time }: any) => {
  return (
    <View className="bg-[#111827] border border-gray-800 rounded-2xl p-4 mb-4 flex-row">
      
      {/* Icon */}
      <View className="w-12 h-12 rounded-xl bg-[#1F2937] items-center justify-center mr-4">
        {icon}
      </View>

      {/* Content */}
      <View className="flex-1">
        <Text className="text-white font-semibold text-base">
          {title}
        </Text>

        <Text className="text-gray-400 text-sm mt-1">
          {description}
        </Text>

        <Text className="text-gray-500 text-xs mt-2">
          {time}
        </Text>
      </View>

    </View>
  );
};

export default function Notifications() {
  return (
    <ScrollView className="flex-1 bg-black px-4 pt-2 ">

      {/* Header */}
      <View className="mb-6">
        <TouchableOpacity
          onPress={() => router.back()}
          className="flex-row items-center mb-4"
        >
          <ArrowLeft color="white" size={18} />
          <Text className="text-white ml-2">Back</Text>
        </TouchableOpacity>

        <Text className="text-white text-2xl font-bold">
          Notifications
        </Text>

        <Text className="text-gray-400 text-sm mt-1">
          Stay updated with your activity
        </Text>
      </View>

      {/* Notifications List */}

      <NotificationCard
        title="Booking Request Approved"
        description="Studio Booking Completed for March 15, 2026"
        time="2 hours ago"
        icon={<Calendar color="#7C3AED" size={20} />}
      />

      <NotificationCard
        title="Payment Completed"
        description="You Payment Completed $500 for Session #1234"
        time="5 hours ago"
        icon={<DollarSign color="#22C55E" size={20} />}
      />

    </ScrollView>
  );
}