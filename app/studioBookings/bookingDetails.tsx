import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { ArrowLeft } from 'lucide-react-native'
import { router } from 'expo-router'

export default function bookingDetails() {
    return (
        <View className="flex-1 bg-black px-4 pt-6">

            {/* Header */}
            <View className="flex-row  gap-3">
                <TouchableOpacity onPress={() => router.back()}>
                    <ArrowLeft color="white" size={24} />
                </TouchableOpacity>

                <View>
                    <Text className="text-white text-xl font-semibold">
                        Booking Details
                    </Text>
                    <Text className="text-gray-400 text-sm">Step 3 of 3</Text>
                </View>
            </View>

            {/* Progress */}
            <View className="flex-row mt-4 gap-2">
                <View className="flex-1 h-1 bg-[#5B2EFF] rounded-full" />
                <View className="flex-1 h-1 bg-[#5B2EFF] rounded-full" />
                <View className="flex-1 h-1 bg-[#5B2EFF] rounded-full" />
            </View>
        </View>
    )
}