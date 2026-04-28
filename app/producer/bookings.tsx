import CustomCalender from '@/components/CustomCalender/CustomCalender'
import SessionCard from '@/components/SessionCard/SessionCard';
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

const Booking = () => {
    const BOOKED = ["2026-04-15", "2026-04-20", "2026-04-25"];

    const confirmedData = [
        {
            id: "1",
            name: "Mike Johnson",
            service: "Sound Recording",
            engineer: "Rafsan Ahmed",
            date: "March 15, 2026",
            time: "2:00 PM - 5:00 PM",
            status: "confirmed",
        },
    ];

    const completedData = [
        {
            id: "2",
            name: "Mike Johnson",
            service: "Sound Recording",
            engineer: "Rafsan Ahmed",
            date: "March 15, 2026",
            time: "2:00 PM - 5:00 PM",
            status: "completed",
        },
    ];

    return (
        <ScrollView className="flex-1 bg-black px-4 pt-2 "
            contentContainerStyle={{ paddingBottom: 100 }}
        >

            <View className='py-4'>
                <Text className='text-white text-4xl font-semibold'>Bookings</Text>
                <Text className='text-white'>Manage studio Sessions</Text>
            </View>
            <CustomCalender bookedDates={BOOKED} mode="simple" />

            {/* Confirmed Session */}

            <Text className="text-white text-xl font-semibold mb-4 mt-5">
                Confirmed Sessions
            </Text>

            {confirmedData.map((item) => (
                <SessionCard key={item.id} item={item} />
            ))}
            {/* Completed Session */}

            <Text className="text-white text-xl font-semibold mt-6 mb-4">
                Completed Sessions
            </Text>

            {completedData.map((item) => (
                <SessionCard key={item.id} item={item} />
            ))}


        </ScrollView>
    )
}

export default Booking