import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import dayjs from "dayjs";

const CustomCalender = () => {
    const [bookedDates, setBookedDates] = useState<string[]>([]);
    const [currentDate, setCurrentDate] = useState(dayjs());

    useEffect(() => {
        const data = ["2026-03-15", "2026-03-30", "2026-03-20", "2026-03-25"];
        setBookedDates(data);
    }, []);

    return (
        <View className="flex-1 border bg-[#111111] border-gray-800 rounded-2xl p-4">
            <Calendar
                key={currentDate.format("YYYY-MM")}
                current={currentDate.format("YYYY-MM-DD")}
                hideArrows
                 hideExtraDays={true} 

                // Custom Header
                renderHeader={() => (
                    <View className="flex-row justify-between  w-full items-center mb-4">

                        {/* Month */}
                        <Text className="text-white text-xl font-bold">
                            {currentDate.format("MMMM YYYY")}
                        </Text>

                        {/* Arrows */}
                        <View className="flex-row justify-end ml-5 gap-3">
                            <TouchableOpacity
                                onPress={() => setCurrentDate(prev => prev.subtract(1, "month"))}
                                className="w-10 h-10   rounded-full bg-[#1A1A1A] items-center justify-center"
                            >
                                <ChevronLeft color="white" size={18} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setCurrentDate(prev => prev.add(1, "month"))}
                                className="w-10 h-10 rounded-full bg-[#1A1A1A] items-center justify-center"
                            >
                                <ChevronRight color="white" size={18} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

                theme={{
                    calendarBackground: "#111111",
                    dayTextColor: "#FFFFFF",
                    monthTextColor: "#FFFFFF",
                    textDisabledColor: "#444444",
                }}

                dayComponent={({ date, state }) => {
                    if (!date) return null;

                    const isUnavailable = bookedDates.includes(date.dateString);
                    const isToday = state === "today";

                    return (
                        <TouchableOpacity
                            className={`
                w-[45px] h-[55px] rounded-xl items-center justify-center mb-2
                ${isUnavailable ? "bg-[#2A1212]" : "bg-black"}
                ${isToday ? "border border-[#5B2EFF]" : ""}
              `}
                        >
                            <Text
                                className={`font-semibold text-lg ${isUnavailable ? "text-[#EF4444]" : "text-white"
                                    }`}
                            >
                                {date.day}
                            </Text>

                            <View
                                className={`w-1.5 h-1.5 rounded-full mt-1.5 ${isUnavailable ? "bg-[#EF4444]" : "bg-[#10B981]"}`}
                            />
                        </TouchableOpacity>
                    );
                }}
            />

            {/* Legend */}
            <View className="flex-row justify-center gap-6 mt-6 border-t border-gray-800 pt-6">
                <View className="flex-row items-center gap-2">
                    <View className="w-3 h-3 rounded-full bg-[#10B981]" />
                    <Text className="text-gray-400">Available</Text>
                </View>
                <View className="flex-row items-center gap-2">
                    <View className="w-3 h-3 rounded-full bg-[#EF4444]" />
                    <Text className="text-gray-400">Unavailable</Text>
                </View>
            </View>
        </View>
    );
};

export default CustomCalender;