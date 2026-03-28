import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { CalendarDays, Clock, Headphones, Hourglass, MapPin } from 'lucide-react-native'

export default function ApprovedBooking() {
    return (
        <View className="bg-[#111111] p-5 rounded-[32px] border border-[#262626] w-full max-w-[380px] self-center mt-8">

            {/* Header: Title and Status Badge */}
            <View className="flex-row justify-between items-center mb-5">
                <Text className="text-white text-2xl font-bold">
                    Summer Mixtape
                </Text>

                <View className="bg-[#00C95033] px-3 py-1.5 rounded-full">
                    <Text className="text-[#05DF72] text-sm font-semibold">
                        Approved
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

            <View className="flex-row items-center justify-between gap-x-4">
                {/* View Details Button */}
                <TouchableOpacity
                    className="flex-1 bg-[#5B2EFF] py-4 rounded-2xl items-center justify-center active:opacity-80"
                >
                    <Text className="text-white font-semibold text-lg">
                        View Details
                    </Text>
                </TouchableOpacity>

                {/* Message Studio Button */}
                <TouchableOpacity
                    className="flex-1 bg-[#262626] py-4 rounded-2xl items-center justify-center active:opacity-80"
                >
                    <Text className="text-white font-semibold text-lg">
                        Message Studio
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}