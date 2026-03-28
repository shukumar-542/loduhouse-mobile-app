import ApprovedBooking from '@/components/ApprovedBooking/ApprovedBooking';
import CompleteBooking from '@/components/CompleteBooking/CompleteBooking';
import CustomCalender from '@/components/CustomCalender/CustomCalender'
import PendingBookingCard from '@/components/PendingBookingCard/PendingBookingCard';
import BookingStatusHeader from '@/components/shared/BookingStatusHeader';
import React from 'react'
import { ScrollView, Text, View } from 'react-native'


const Booking = () => {





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
            <PendingBookingCard/>

            {/* Approved Bookings  */}
            <BookingStatusHeader bookingStatus={"Approved"} totalItem={2} />
            <ApprovedBooking/>

            {/* Complete bookigns */}
            <BookingStatusHeader bookingStatus={"Completed"} totalItem={3} />
            <CompleteBooking/>

        </ScrollView>
    )
}

export default Booking