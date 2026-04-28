import PendingCard from '@/components/PendingCard '
import StatCard from '@/components/StatCard'
import { router } from 'expo-router'
import { AlertCircle, Bell, Calendar, DollarSign } from 'lucide-react-native'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

const data = [
    {
        id: "1",
        name: "Mike Johnson",
        service: "Sound Recording",
        tag: "Mixing",
        date: "March 10, 2026",
        time: "3:00 PM - 6:00 PM",
    },
    {
        id: "2",
        name: "John Doe",
        service: "Vocal Recording",
        tag: "Recording",
        date: "March 12, 2026",
        time: "1:00 PM - 4:00 PM",
    },
];
const dashboard = () => {

    const handleApprove = (id: string) => {
        console.log("Approved:", id);
    };

    const handleReject = (id: string) => {
        console.log("Rejected:", id);
    };


    return (
        <ScrollView className="flex-1 bg-black px-4 pt-5"
            contentContainerStyle={{ paddingBottom: 120 }}>
            {/* Header */}
            <View className="flex-row justify-between items-center mb-6">
                <View>
                    <Text className="text-white text-3xl font-bold">Studio Dashboard</Text>
                    <Text className="text-gray-200 text-md font-medium">
                        Here's what's happening today
                    </Text>
                </View>

                <TouchableOpacity
                    onPress={() => router.push("/notification")}
                    className="w-10 h-10 rounded-xl bg-[#111827] items-center justify-center border border-gray-800">
                    <Bell color="white" size={20} />
                </TouchableOpacity>
            </View>

            <View className="flex-row gap-3">

                <StatCard
                    icon={<DollarSign color="#10B981" size={22} />}
                    value="$12,450"
                    label="Revenue"
                />

                <StatCard
                    icon={<Calendar color="#7C3AED" size={22} />}
                    value="28"
                    label="Sessions"
                />

                <StatCard
                    icon={<AlertCircle color="#FACC15" size={22} />}
                    value="3"
                    label="Pending"
                />

            </View>


            <Text className="text-white text-xl font-semibold mb-4 mt-5">
                Pending Approvals
            </Text>

            {data.map((item) => (
                <PendingCard
                    key={item.id}
                    item={item}
                    onApprove={handleApprove}
                    onReject={handleReject}
                />
            ))}

        </ScrollView>
    )
}



export default dashboard


