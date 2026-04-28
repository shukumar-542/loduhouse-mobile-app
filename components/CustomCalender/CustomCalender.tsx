import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import dayjs from "dayjs";

// ─── Types ────────────────────────────────────────────────────────────────────

type CalendarMode = "simple" | "detailed";

interface CustomCalenderProps {
    /** Dates that are booked / unavailable. Format: "YYYY-MM-DD" */
    bookedDates?: string[];
    /**
     * "simple"   → shows a single purple dot on booked days + "Has Bookings" legend  (Image 1)
     * "detailed" → shows red cell for unavailable, green dot for available            (Image 2)
     */
    mode?: CalendarMode;
    /** Called when user taps a day */
    onDayPress?: (dateString: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

const CustomCalender: React.FC<CustomCalenderProps> = ({
    bookedDates = [],
    mode = "simple",
    onDayPress,
}) => {
    const [currentDate, setCurrentDate] = useState(dayjs());

    // ── Day cell ──────────────────────────────────────────────────────────────

    const renderDay = ({ date, state }: { date?: any; state?: string }) => {
        if (!date) return null;

        const isUnavailable = bookedDates.includes(date.dateString);
        const isToday = state === "today";
        const isDisabled = state === "disabled";

        if (mode === "simple") {
            return (
                <TouchableOpacity
                    onPress={() => onDayPress?.(date.dateString)}
                    className={`
                        w-[45px] h-[55px] rounded-xl items-center justify-center mb-2
                        bg-black
                        ${isToday ? "border border-[#5B2EFF]" : ""}
                    `}
                >
                    <Text
                        className={`font-semibold text-lg ${
                            isDisabled ? "text-[#444444]" : "text-white"
                        }`}
                    >
                        {date.day}
                    </Text>

                    {/* Purple dot only on booked days; transparent placeholder otherwise */}
                    <View
                        className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                            isUnavailable ? "bg-[#5B2EFF]" : "bg-transparent"
                        }`}
                    />
                </TouchableOpacity>
            );
        }

        // mode === "detailed"
        return (
            <TouchableOpacity
                onPress={() => onDayPress?.(date.dateString)}
                className={`
                    w-[45px] h-[55px] rounded-xl items-center justify-center mb-2
                    ${isUnavailable ? "bg-[#2A1212]" : "bg-black"}
                    ${isToday ? "border border-[#5B2EFF]" : ""}
                `}
            >
                <Text
                    className={`font-semibold text-lg ${
                        isDisabled
                            ? "text-[#444444]"
                            : isUnavailable
                            ? "text-[#EF4444]"
                            : "text-white"
                    }`}
                >
                    {date.day}
                </Text>

                <View
                    className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                        isUnavailable ? "bg-[#EF4444]" : "bg-[#10B981]"
                    }`}
                />
            </TouchableOpacity>
        );
    };

    // ── Render ────────────────────────────────────────────────────────────────

    return (
        <View className="flex-1 border bg-[#111111] border-gray-800 rounded-2xl p-4">
            <Calendar
                key={currentDate.format("YYYY-MM")}
                current={currentDate.format("YYYY-MM-DD")}
                hideArrows
                hideExtraDays={true}
                renderHeader={() => (
                    <View className="flex-row justify-between w-full items-center mb-4">
                        <Text className="text-white text-xl font-bold">
                            {currentDate.format("MMMM YYYY")}
                        </Text>

                        <View className="flex-row justify-end ml-5 gap-3">
                            <TouchableOpacity
                                onPress={() =>
                                    setCurrentDate(prev => prev.subtract(1, "month"))
                                }
                                className="w-10 h-10 rounded-full bg-[#1A1A1A] items-center justify-center"
                            >
                                <ChevronLeft color="white" size={18} />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() =>
                                    setCurrentDate(prev => prev.add(1, "month"))
                                }
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
                dayComponent={renderDay}
            />

            {/* ── Legend ── */}
            <View className="flex-row justify-center gap-6 mt-6 border-t border-gray-800 pt-6">
                {mode === "simple" ? (
                    <View className="flex-row items-center gap-2">
                        <View className="w-3 h-3 rounded-full bg-[#5B2EFF]" />
                        <Text className="text-gray-400">Has Bookings</Text>
                    </View>
                ) : (
                    <>
                        <View className="flex-row items-center gap-2">
                            <View className="w-3 h-3 rounded-full bg-[#10B981]" />
                            <Text className="text-gray-400">Available</Text>
                        </View>
                        <View className="flex-row items-center gap-2">
                            <View className="w-3 h-3 rounded-full bg-[#EF4444]" />
                            <Text className="text-gray-400">Unavailable</Text>
                        </View>
                    </>
                )}
            </View>
        </View>
    );
};

export default CustomCalender;

// ─── Usage Examples ───────────────────────────────────────────────────────────
//
// const BOOKED = ["2026-03-15", "2026-03-20", "2026-03-25", "2026-03-30"];
//
// // Image 1 – simple dot mode
// <CustomCalender
//   bookedDates={BOOKED}
//   mode="simple"
//   onDayPress={(date) => console.log("tapped:", date)}
// />
//
// // Image 2 – detailed available/unavailable mode
// <CustomCalender
//   bookedDates={BOOKED}
//   mode="detailed"
//   onDayPress={(date) => console.log("tapped:", date)}
// />