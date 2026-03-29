import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import { ArrowLeft, Clock } from "lucide-react-native";

const timeSlots = [
  { time: "09:00 AM", booked: false },
  { time: "10:00 AM", booked: false },
  { time: "11:00 AM", booked: true },
  { time: "12:00 PM", booked: false },
  { time: "01:00 PM", booked: false },
  { time: "02:00 PM", booked: true },
  { time: "03:00 PM", booked: false },
  { time: "04:00 PM", booked: false },
  { time: "05:00 PM", booked: false },
  { time: "06:00 PM", booked: true },
  { time: "07:00 PM", booked: false },
  { time: "08:00 PM", booked: false },
];

export default function SelectTime() {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);


  return (
    <View className="flex-1 bg-black px-4 pt-6">

      {/* Header */}
      <View className="flex-row  gap-3">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft color="white" size={24} />
        </TouchableOpacity>

        <View>
          <Text className="text-white text-xl font-semibold">
            Select Time
          </Text>
          <Text className="text-gray-400 text-sm">Step 2 of 3</Text>
        </View>
      </View>

      {/* Progress */}
      <View className="flex-row mt-4 gap-2">
        <View className="flex-1 h-1 bg-[#5B2EFF] rounded-full" />
        <View className="flex-1 h-1 bg-[#5B2EFF] rounded-full" />
        <View className="flex-1 h-1 bg-gray-700 rounded-full" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Selected Date Card */}
        <View className="bg-[#111111] mt-6 p-4 rounded-2xl border border-gray-800 flex-row items-center gap-3">
          <View className="w-10 h-10 rounded-full bg-[#5B2EFF]/20 items-center justify-center">
            <Clock color="#5B2EFF" size={18} />
          </View>

          <View>
            <Text className="text-gray-400 text-sm">Selected Date</Text>
            <Text className="text-white font-semibold">
              Monday, March 2
            </Text>
          </View>
        </View>

        {/* Time Slots */}
        <View className="bg-[#111111] mt-6 p-4 rounded-2xl border border-gray-800">
          <Text className="text-white font-semibold text-lg mb-4">
            Available Time Slots
          </Text>

          <View className="flex-row flex-wrap justify-between">
            {timeSlots.map((slot, index) => {
              const isSelected = selectedTime === slot.time;

              return (
                <TouchableOpacity
                  key={index}
                  disabled={slot.booked}
                  onPress={() => setSelectedTime(slot.time)}
                  className={`w-[48%] p-4 rounded-xl mb-3 border items-center
                    ${
                      slot.booked
                        ? "bg-[#0F0F0F] border-gray-800"
                        : isSelected
                        ? "bg-[#5B2EFF] border-[#5B2EFF]"
                        : "bg-black border-gray-700"
                    }
                  `}
                >
                  <Text
                    className={`font-semibold
                      ${
                        slot.booked
                          ? "text-gray-500"
                          : isSelected
                          ? "text-white"
                          : "text-white"
                      }
                    `}
                  >
                    {slot.time}
                  </Text>

                  {slot.booked && (
                    <Text className="text-red-500 text-xs mt-1">
                      Booked
                    </Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

      </ScrollView>

      {/* Bottom Button */}
      <View className="pb-6">
        <TouchableOpacity
          disabled={!selectedTime}
          onPress={() => router.push("/studioBookings/bookingDetails")}
          className={`py-4 rounded-xl items-center
            ${selectedTime ? "bg-[#5B2EFF]" : "bg-gray-700"}
          `}
        >
          <Text className="text-white font-semibold text-lg">
            Continue to Project Details
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}