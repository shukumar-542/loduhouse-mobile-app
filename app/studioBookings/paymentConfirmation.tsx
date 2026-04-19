import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { ArrowLeft, CheckCircle, CircleCheck, CreditCard } from 'lucide-react-native'
import { router } from 'expo-router'

export default function paymentConfirmation() {
    return (
        <View className="flex-1 bg-black px-4 pt-6">
            <ScrollView >
                {/* Booking details content would go here */}
                <View className='flex-row  gap-5'>
                    <TouchableOpacity
                        onPress={() => router.back()}
                    >
                        <ArrowLeft color="white" size={25} />
                    </TouchableOpacity>
                    <View className=''>
                        <Text className="text-white text-2xl font-bold">Confirm & Pay</Text>
                        <Text className="text-gray-400 text-sm mt-1">
                            Review your booking details
                        </Text>
                    </View>
                </View>

                {/* Booking Details */}
                <View className="bg-[#111111] rounded-2xl p-6  mt-6 shadow-xl border  border-gray-800">
                    {/* Header */}
                    <Text className="text-white text-2xl font-bold mb-6">Booking Details</Text>

                    {/* Details Rows */}
                    <View className="space-y-5">
                        {/* Studio */}
                        <View className="flex-row justify-between items-center">
                            <Text className="text-zinc-400 text-base">Studio</Text>
                            <Text className="text-white text-base font-medium text-right flex-1 ml-4">
                                Loud House Premium Studio
                            </Text>
                        </View>

                        {/* Time */}
                        <View className="flex-row justify-between items-center">
                            <Text className="text-zinc-400 text-base">Time</Text>
                            <Text className="text-white text-base font-medium">
                                09:00 AM - 10:00 AM
                            </Text>
                        </View>

                        {/* Date */}
                        <View className="flex-row justify-between items-center">
                            <Text className="text-zinc-400 text-base">Date</Text>
                            <Text className="text-white text-base font-medium">
                                Monday, March 2
                            </Text>
                        </View>

                        {/* Project Name */}
                        <View className="flex-row justify-between items-center">
                            <Text className="text-zinc-400 text-base">Project Name</Text>
                            <Text className="text-white text-base font-medium text-right flex-1 ml-4">
                                Sound Recording
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Payment Summary */}
                <View className="bg-[#111111] rounded-2xl p-6 mt-6 shadow-xl border border-gray-800">
                    <Text className="text-white text-2xl font-bold mb-6">Payment Summary</Text>
                    <View className="flex-row justify-between items-center">
                        <Text className="text-zinc-400 text-base">Hourly Rate</Text>
                        <Text className="text-white text-base font-medium">
                            $150.00
                        </Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                        <Text className="text-zinc-400 text-base">Duration</Text>
                        <Text className="text-white text-base font-medium">
                            1 hour
                        </Text>
                    </View>
                    <View className="flex-row justify-between items-center mt-4 border-t border-gray-800 pt-4">
                        <Text className="text-zinc-400 text-base">Total</Text>
                        <Text className="text-white text-xl font-bold">
                            $150.00
                        </Text>
                    </View>
                </View>

                {/* Payment Method */}
                <View className="bg-[#111111] rounded-2xl p-6 mt-6 shadow-xl border border-gray-800">
                    <Text className="text-white text-2xl font-bold mb-6">Payment Method</Text>
                    <View className='bg-black p-2 border border-gray-900 flex-row items-center gap-2 rounded-lg'>
                        <View className='bg-[#111111] p-2 rounded-full'>
                            <CreditCard color="white" size={20} />
                        </View>
                        <Text className="text-white text-base font-medium">
                            Credit / Debit Card
                        </Text>

                    </View>
                </View>

                {/* Warning Message */}
                <View className="bg-[#181200] border border-amber-500/30 rounded-3xl p-5  mt-6">
                    {/* Header with Icon */}
                    <View className="flex-row  gap-3 mb-3">
                        <CheckCircle size={24} color="#fbbf24" strokeWidth={3} />
                        <View>
                            <Text className="text-[#FDC700] text-xl font-semibold">
                                Booking Approval Required
                            </Text>
                            <Text className="text-[#FDC700] text-[12px] leading-6">
                                Your booking will be reviewed by the studio owner. Project workspace will be activated after approval.
                            </Text>
                        </View>

                    </View>
                </View>

                <View className="pb-6">
                    <TouchableOpacity
                        onPress={() => router.push("/studioBookings/bookingConfirmed")}
                        className={`py-4 mt-5 rounded-xl items-center bg-[#5B2EFF] }`}
                    >
                        <Text className="text-white font-semibold text-lg">
                            Pay $150.00 & Confirm Booking
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

        </View >
    )
}