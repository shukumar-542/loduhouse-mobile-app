import CustomCalender from '@/components/CustomCalender/CustomCalender'
import BookingStatusHeader from '@/components/shared/BookingStatusHeader';
import React from 'react'
import { ScrollView, Text, View } from 'react-native'


const Booking = () => {

    const bookedDates = ["2026-03-15", "2026-03-18", "2026-03-20"];




    return (
        <ScrollView className="flex-1 bg-black px-4 pt-2 "
            contentContainerStyle={{ paddingBottom: 100 }}
        >

            <View className='mb-5'>
                <Text className="text-white text-3xl font-bold">My Bookings</Text>
                <Text className="text-gray-400 text-sm mt-1">
                    Track your studio sessions
                </Text>
            </View>

            {/* Calender section */}
            <CustomCalender />

            {/* Pending bookings */}
            <BookingStatusHeader bookingStatus={"Pending"} totalItem={1} />
            <BookingStatusHeader bookingStatus={"Approved"} totalItem={2} />
            <BookingStatusHeader bookingStatus={"Completed"} totalItem={3} />


        </ScrollView>
    )
}

export default Booking