import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import BackButton from "@/components/shared/BackButton";

type Session = {
    id: string;
    title: string;
    engineer: string;
    tag: string;
    tagColor: string;
    date: string;
    time: string;
    price: string;
    engineerShare: string;
    status: "upcoming" | "completed";
    statusLabel: string;
    statusColor: string;
    completedNote?: string;
};

const sessions: Session[] = [
    {
        id: "1",
        title: "Beat Production",
        engineer: "Sarah Williams",
        tag: "Production",
        tagColor: "bg-indigo-900 text-indigo-300",
        date: "Mar 25, 2026",
        time: "1:00 PM – 4:00 PM",
        price: "$150",
        engineerShare: "$75",
        status: "upcoming",
        statusLabel: "Confirmed",
        statusColor: "bg-green-900 text-green-400",
    },
    {
        id: "2",
        title: "Album Recording",
        engineer: "Mike Johnson",
        tag: "Recording",
        tagColor: "bg-[#2B7FFF33] text-[#51A2FF]",
        date: "Mar 10, 2026",
        time: "3:00 PM – 6:00 PM",
        price: "$150",
        engineerShare: "$75",
        status: "completed",
        statusLabel: "Completed",
        statusColor: "bg-[#181428] text-[#5B2EFF]",
        completedNote: "Session completed successfully",
    },
    {
        id: "3",
        title: "Mix & Master",
        engineer: "James Lee",
        tag: "Mixing",
        tagColor: "bg-purple-900 text-purple-300",
        date: "Apr 2, 2026",
        time: "11:00 AM – 2:00 PM",
        price: "$200",
        engineerShare: "$100",
        status: "upcoming",
        statusLabel: "Confirmed",
        statusColor: "bg-[#00C95033] text-[#05DF72]",
    },
];

type Tab = "All" | "Upcoming" | "Completed";

const SessionCard = ({ session }: { session: Session }) => (
    <View className="bg-[#111111] rounded-2xl p-4 mb-4">
        {/* Title + Status */}
        <View className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center gap-3">
                <View className="w-9 h-9 rounded-xl bg-indigo-600 items-center justify-center">
                    <Text className="text-white">🎵</Text>
                </View>
                <Text className="text-white text-[16px] font-semibold">
                    {session.title}
                </Text>
            </View>
            <View className={`px-2 py-1 rounded-lg ${session.statusColor}`}>
                <Text className="text-xs text-white font-medium">{session.statusLabel}</Text>
            </View>
        </View>

        {/* Engineer */}
        <Text className="text-zinc-400 text-sm mb-2">👤 {session.engineer}</Text>

        {/* Tag */}
        <View className={`self-start px-3 py-1 rounded-lg mb-3 ${session.tagColor}`}>
            <Text className="text-xs text-white font-medium">{session.tag}</Text>
        </View>

        {/* Divider */}
        <View className="border-t border-zinc-800 mb-3" />

        {/* Details */}
        <View className="gap-1.5">
            <Text className="text-zinc-400 text-sm">📅 {session.date}</Text>
            <Text className="text-zinc-400 text-sm">🕐 {session.time}</Text>
            <Text className="text-zinc-400 text-sm">
                💵 <Text className="line-through">{session.price}</Text> · Engineer share:{" "}
                {session.engineerShare}
            </Text>
        </View>

        {/* Completed note */}
        {session.completedNote && (
            <Text className="text-green-400 text-sm mt-3">
                ✅ {session.completedNote}
            </Text>
        )}
    </View>
);

export default function EngineerSession() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<Tab>("All");

    const filtered = sessions.filter((s) => {
        if (activeTab === "All") return true;
        if (activeTab === "Upcoming") return s.status === "upcoming";
        if (activeTab === "Completed") return s.status === "completed";
    });

    const upcomingCount = sessions.filter((s) => s.status === "upcoming").length;
    const completedCount = sessions.filter((s) => s.status === "completed").length;

    const tabs: Tab[] = ["All", "Upcoming", "Completed"];

    return (
        <ScrollView
            className="flex-1 bg-[#000000] px-4 pt-5"
            contentContainerStyle={{ paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
        >
            {/* Header */}
            <BackButton title='Engineer Sessions' subTitle='Session history & upcoming' />

            {/* Engineer Profile Card */}
            <View className=" bg-[#111111] rounded-2xl px-4 py-4 flex-row items-center gap-4 mb-4">
                <View className="w-14 h-14 rounded-2xl bg-indigo-600 items-center justify-center">
                    <Text className="text-2xl">🎧</Text>
                </View>
                <View>
                    <Text className="text-white text-[17px] font-semibold">
                        Rafsan Ahmed
                    </Text>
                    <Text className="text-[#5B2EFF] text-xs mb-1">
                        Mixing & Mastering Specialist
                    </Text>
                    <Text className="text-yellow-400 text-xs">⭐ 4.9 Rating</Text>
                </View>
            </View>

            {/* Stats Grid */}
            <View className="gap-3 mb-6">
                <View className="flex-row gap-3">
                    <View className="flex-1 bg-[#111111] rounded-2xl p-4">
                        <Text className="text-zinc-400 text-xs mb-1">🗂 Total{"\n"}Sessions</Text>
                        <Text className="text-white text-2xl font-bold mt-1">{sessions.length}</Text>
                    </View>
                    <View className="flex-1 bg-[#111111] rounded-2xl p-4">
                        <Text className="text-zinc-400 text-xs mb-1">📈 Total{"\n"}Earnings</Text>
                        <Text className="text-white text-2xl font-bold mt-1">$380</Text>
                    </View>
                </View>
                <View className="flex-row gap-3">
                    <View className="flex-1 bg-[#111111] rounded-2xl p-4">
                        <Text className="text-zinc-400 text-xs mb-1">🕐 Upcoming</Text>
                        <Text className="text-white text-2xl font-bold mt-1">{upcomingCount}</Text>
                    </View>
                    <View className="flex-1 bg-[#111111] rounded-2xl p-4">
                        <Text className="text-zinc-400 text-xs mb-1">✅ Completed</Text>
                        <Text className="text-white text-2xl font-bold mt-1">{completedCount}</Text>
                    </View>
                </View>
            </View>

            {/* Tabs */}
            <View className="flex-row bg-[#111111] rounded-2xl p-1 mb-5">
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setActiveTab(tab)}
                        className={`flex-1 py-4 rounded-xl items-center ${activeTab === tab ? "bg-[#5B2EFF]" : ""
                            }`}
                    >
                        <Text
                            className={`text-sm font-medium ${activeTab === tab ? "text-white" : "text-zinc-400"
                                }`}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Session Cards */}
            <View >
                {filtered.length === 0 ? (
                    <Text className="text-zinc-500 text-center mt-10">
                        No sessions found.
                    </Text>
                ) : (
                    filtered.map((session) => (
                        <SessionCard key={session.id} session={session} />
                    ))
                )}
            </View>
        </ScrollView>
    );
}