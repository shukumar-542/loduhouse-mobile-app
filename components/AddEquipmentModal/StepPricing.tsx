import { View, Text, TextInput, Switch } from "react-native";
import { Clock, Receipt } from "lucide-react-native";

type DaySchedule = {
    enabled: boolean;
    start: string;
    end: string;
};

type WeeklySchedule = Record<string, DaySchedule>;

type Props = {
    hourlyRate: string;
    onRateChange: (v: string) => void;
    schedule: WeeklySchedule;
    onScheduleChange: (day: string, field: keyof DaySchedule, value: boolean | string) => void;
};

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const defaultSchedule: WeeklySchedule = Object.fromEntries(
    DAYS.map((day) => [
        day,
        { enabled: day !== "Sun", start: "09:00 AM", end: "09:00 PM" },
    ])
);

export default function StepPricing({ hourlyRate, onRateChange, schedule, onScheduleChange }: Props) {
    return (
        <View className="gap-4">
            {/* Pricing */}
            <View className="bg-zinc-900 rounded-2xl p-4 border border-[#4F4F59]">
                <View className="flex-row mb-2">
                    <Receipt color={"#5B2EFF"} />
                    <Text className="text-white font-semibold text-xl mb-3"> Pricing</Text>
                </View>
                <Text className="text-white text-md  mb-2">Hourly Rate ($)</Text>
                <TextInput
                    className="bg-zinc-950 text-white rounded-xl px-4 py-3 text-sm"
                    placeholder="$"
                    placeholderTextColor="#6b7280"
                    keyboardType="numeric"
                    value={hourlyRate}
                    onChangeText={onRateChange}
                />
            </View>

            {/* Weekly Availability */}
            <View className="bg-zinc-900 rounded-2xl p-4 border border-[#4F4F59]">
                <View className="flex-row items-center gap-2 mb-2">
                    <Clock color="#5B2EFF" size={22} />
                    <Text className="text-white text-xl font-semibold">Weekly Availability</Text>
                </View>

                {DAYS.map((day) => (
                    <View key={day} className="mb-3 border border-[#5B2EFF] bg-[#15121D] rounded-xl px-3 pb-2">
                        {/* Day toggle */}
                        <View className="flex-row items-center justify-between">
                            <Text className="text-white text-sm font-medium">{day}</Text>
                            <Switch
                                value={schedule[day].enabled}
                                onValueChange={(v) => onScheduleChange(day, "enabled", v)}
                                trackColor={{ false: "#3f3f46", true: "#5B2EFF" }}
                                thumbColor="#ffffff"
                            />
                        </View>

                        {/* Time inputs — only if enabled */}
                        {schedule[day].enabled && (
                            <View className="flex-row gap-3">
                                <View className="flex-1 flex-row items-center bg-zinc-950 rounded-xl px-3 py-2 gap-2">
                                    <TextInput
                                        className="text-white text-sm flex-1"
                                        value={schedule[day].start}
                                        onChangeText={(v) => onScheduleChange(day, "start", v)}
                                        placeholderTextColor="#6b7280"
                                    />
                                    <Clock color="#6b7280" size={14} />
                                </View>
                                <View className="flex-1 flex-row items-center bg-zinc-950 rounded-xl px-3 py-2 gap-2">
                                    <TextInput
                                        className="text-white text-sm flex-1"
                                        value={schedule[day].end}
                                        onChangeText={(v) => onScheduleChange(day, "end", v)}
                                        placeholderTextColor="#6b7280"
                                    />
                                    <Clock color="#6b7280" size={14} />
                                </View>
                            </View>
                        )}
                    </View>
                ))}
            </View>

            {/* Almost Done */}
            <View className="bg-green-950 border border-green-800 rounded-2xl p-4 flex-row items-start gap-2">
                <Text className="text-green-400 text-base">✅</Text>
                <View>
                    <Text className="text-green-400 font-semibold text-sm">Almost Done!</Text>
                    <Text className="text-green-600 text-xs mt-0.5">
                        Complete this step to activate your studio and start receiving bookings.
                    </Text>
                </View>
            </View>
        </View>
    );
}