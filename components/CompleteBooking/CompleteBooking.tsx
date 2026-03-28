import { View, Text } from 'react-native'
import React from 'react'
import { CalendarDays, Clock, Headphones, Hourglass, MapPin } from 'lucide-react-native'

export default function CompleteBooking() {
  return (
      <View className="bg-[#111111] p-5 rounded-[32px] border border-[#262626] w-full max-w-[380px] self-center mt-8">

            {/* Header: Title and Status Badge */}
            <View className="flex-row justify-between items-center mb-5">
                <Text className="text-white text-2xl font-bold">
                    Summer Mixtape
                </Text>

                <View className="bg-[#2B7FFF33] px-3 py-1.5 rounded-full">
                    <Text className="text-[#51A2FF] text-sm font-semibold">
                        Pending
                    </Text>
                </View>
            </View>

            {/* Details Section */}
            <View className="gap-y-3.5">
                {/* Location */}
                <View className="flex-row items-center gap-x-3">
                    <MapPin size={20} color="white" />
                    <Text className="text-white text-base font-medium">
                        123 Music Street, LA
                    </Text>
                </View>

                {/* Date */}
                <View className="flex-row items-center gap-x-3">
                    <CalendarDays size={20} color="white" />
                    <Text className="text-white text-base font-medium">
                        March 15, 2026
                    </Text>
                </View>

                {/* Time */}
                <View className="flex-row items-center gap-x-3">
                    <Clock size={20} color="white" />
                    <Text className="text-white text-base font-medium">
                        2:00 PM - 5:00 PM
                    </Text>
                </View>

                {/* User/Artist */}
                <View className="flex-row items-center gap-x-3">
                    <Headphones size={20} color="white" />
                    <Text className="text-white text-base font-medium">
                        Rafsan Ahmed
                    </Text>
                </View>
            </View>

            {/* Divider */}
            <View className="border-b border-[#2A2A2A] mt-5 mb-4" />

            {/* Footer Info */}
            <View className="flex-row items-center gap-x-2">
                <Text className="text-[#5B2EFF] text-xl font-medium">
                   View Details
                </Text>
            </View>

        </View>
  )
}