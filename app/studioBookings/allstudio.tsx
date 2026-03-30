import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import img1 from "@/assets/images/booking1.png";
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import SearchBox from '@/components/shared/SearchBox';
import BookingCard from '@/components/BookingCard/BookingCard';
const allstudio = () => {
    const [search, setSearch] = useState("");


    // Booking data (replace with real data in production)
    const studios = [
        {
            id: 1,
            title: "Loud House Premium Studio",
            description: "Professional recording studio",
            location: "Dhaka, Bangladesh",
            price: 150,
            rating: 4.9,
            reviews: 127,
            image: img1,
        },
        {
            id: 2,
            title: "Sound Lab Studio",
            description: "High quality mixing & mastering",
            location: "Chittagong, Bangladesh",
            price: 120,
            rating: 4.7,
            reviews: 98,
            image: img1,
        },
    ];
    return (
        <ScrollView className="flex-1 bg-black px-4 pt-2">
            <TouchableOpacity
                onPress={() => router.back()}
                className="flex-row items-center mb-4"
            >
                <ArrowLeft color="white" size={30} />
            </TouchableOpacity>
            <View className='mb-5'>
                <Text className="text-white text-3xl font-bold">Find Your Studio</Text>
                <Text className="text-gray-400 text-sm mt-1">
                    Browse and book premium recording studios
                </Text>
            </View>
            <SearchBox
                placeholder="Search studios..."
                value={search}
                onChangeText={setSearch}
                mode="visits"
            />

            {/* Booking Cards */}
            {studios.map((item) => (
                <BookingCard
                    key={item.id}
                    title={item.title}
                    description={item.description}
                    location={item.location}
                    price={item.price}
                    rating={item.rating}
                    reviews={item.reviews}
                    image={item.image}
                    onPress={() => router.push({
                        pathname: "/studioBookings/studiodetails",
                        params: { id: item.id }
                    })}
                />
            ))}

        </ScrollView>
    )
}

export default allstudio