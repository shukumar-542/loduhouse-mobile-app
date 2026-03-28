import { View, Text } from 'react-native'
import React from 'react'

interface booking {
    bookingStatus : string,
    totalItem : number
}

const BookingStatusHeader = ({bookingStatus , totalItem} : booking) => {
    
    return (
        <View className='mt-5 flex-row justify-between items-center'>
            <Text className='text-white font-semibold text-2xl'>{bookingStatus} Booking </Text>
            <View className={` ${bookingStatus === "Pending" ? "bg-[#F0B10033]" : bookingStatus === "Approved" ? "bg-[#00C95033]" : "bg-[#172741]"} w-10 h-10 rounded-full items-center justify-center`}>
                <Text className={`${bookingStatus === "Pending" ? "text-[#FDC700]" : bookingStatus === "Approved" ? "text-[#05DF72]" : "text-[#51A2FF]"} font-bold text-lg`}>{totalItem}</Text>
            </View>
        </View>
    )
}

export default BookingStatusHeader