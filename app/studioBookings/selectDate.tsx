import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import dayjs from "dayjs";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react-native";
import { router } from "expo-router";

export default function selectDate() {

    const [currentDate, setCurrentDate] = useState(dayjs());
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const startOfMonth = currentDate.startOf("month").day();
    const daysInMonth = currentDate.daysInMonth();

    const daysArray = [];

    // Empty spaces (start padding)
    for (let i = 0; i < startOfMonth; i++) {
        daysArray.push(null);
    }

    // Days
    for (let i = 1; i <= daysInMonth; i++) {
        daysArray.push(i);
    }

    console.log(selectedDate)
    return (
        <View className="flex-1 bg-black px-4 pt-3">

            {/* Header */}
            <View className="w-full flex-row  gap-3  ">

                {/* Back Button */}
                <TouchableOpacity
                    onPress={() => router.back()}
                    className=""
                >
                    <ArrowLeft color="white" size={25} />
                </TouchableOpacity> 
                {/* Rating + Location */}
                <View>
                    <Text className="text-white text-2xl">
                        Select Date 
                    </Text>
                    <View className="flex-row items-center">
                       <Text className="text-white">Step 1 of 3</Text>
                    </View>

                </View>
            </View>

            {/* Progress */}
            <View className="flex-row mt-4 gap-2">
                <View className="flex-1 h-1 bg-[#5B2EFF] rounded-full" />
                <View className="flex-1 h-1 bg-gray-700 rounded-full" />
                <View className="flex-1 h-1 bg-gray-700 rounded-full" />
            </View>

            {/* Calendar Card */}
            <View className="bg-[#111111] mt-6 rounded-2xl p-4 border border-gray-800">

                {/* Month Header */}
                <View className="flex-row justify-between items-center mb-4">
                    <TouchableOpacity
                        onPress={() => setCurrentDate(currentDate.subtract(1, "month"))}
                    >
                        <ChevronLeft color="#5B2EFF" />
                    </TouchableOpacity>

                    <Text className="text-white text-lg font-semibold">
                        {currentDate.format("MMMM YYYY")}
                    </Text>

                    <TouchableOpacity
                        onPress={() => setCurrentDate(currentDate.add(1, "month"))}
                    >
                        <ChevronRight color="#5B2EFF" />
                    </TouchableOpacity>
                </View>

                {/* Week Days */}
                <View className="flex-row justify-between mb-3">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                        <Text key={d} className="text-gray-400 w-10 text-center">
                            {d}
                        </Text>
                    ))}
                </View>

                {/* Dates Grid */}
                <View className="flex-row flex-wrap">
                    {daysArray.map((day, index) => {
                        const isSelected =
                            day &&
                            selectedDate.date() === day &&
                            selectedDate.month() === currentDate.month();

                        return (
                            <TouchableOpacity
                                key={index}
                                disabled={!day}
                                onPress={() =>
                                    setSelectedDate(currentDate.date(day as number))
                                }
                                className="w-[14.28%] items-center mb-4"
                            >
                                <View
                                    className={`w-10 h-10 rounded-full items-center justify-center
                  ${isSelected ? "bg-[#5B2EFF]" : ""}
                `}
                                >
                                    <Text
                                        className={`${isSelected ? "text-white" : "text-gray-300"
                                            }`}
                                    >
                                        {day ?? ""}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>

            {/* Bottom Button */}
            <View className="absolute bottom-6 left-4 right-4">
                <TouchableOpacity onPress={() => router.push("/studioBookings/selectTime")} className="bg-[#5B2EFF] py-4 rounded-xl items-center">
                    <Text className="text-white font-semibold text-lg">
                        Continue to Time Selection
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}