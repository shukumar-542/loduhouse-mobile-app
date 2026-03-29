import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, Headphones, MapPin, Mic, Music, Shield, Speaker, Star } from "lucide-react-native";
import { useState } from "react";
import img1 from "@/assets/images/gallary1.png";
import img2 from "@/assets/images/gallary2.png";
import img3 from "@/assets/images/gallary3.png";
import img4 from "@/assets/images/gallary4.png";


export default function StudioDetails() {
    const [activeTab, setActiveTab] = useState("gallery");
    const { id } = useLocalSearchParams();


    const policies = [
        { id: 1, text: "Minimum booking: 2 hours" },
        { id: 2, text: "Cancellation: 24 hours notice required" },
        { id: 3, text: "Deposit: 30% advance payment" },
        { id: 4, text: "Late arrival: 15 min grace period" },
        { id: 5, text: "Equipment damage: Full replacement cost" },
    ];

    const equipmentList = [
        {
            id: 1,
            name: "Neumann U87",
            category: "Microphone",
            icon: <Mic size={24} color="#5B2EFF" />,
        },
        {
            id: 2,
            name: "Audio-Technica ATH-M50x U87",
            category: "Headphones",
            icon: <Headphones size={24} color="#5B2EFF" />,
        },
        {
            id: 3,
            name: "SSL Console",
            category: "Mixing Desk",
            icon: <Music size={24} color="#5B2EFF" />,
        },
        {
            id: 4,
            name: "Yamaha HS8",
            category: "Studio Monitors",
            icon: <Speaker size={24} color="#5B2EFF" />,
        },
    ];

    return (
        <View className="flex-1 bg-black pt-3 ">
            <ScrollView >
                {/* Header Back Button section */}
                <View className="w-full flex-row  gap-3  ">

                    {/* Back Button */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className=""
                    >
                        <ArrowLeft color="white" size={25} />
                    </TouchableOpacity>
                    {/* Rating + Location */}
                    <View>
                        <Text className="text-white text-2xl">
                            Loud House Premium Studio
                        </Text>
                        <View className="flex-row items-center">
                            <Star size={14} color="#FACC15" fill="#FACC15" />
                            <Text className="text-white ml-1 text-sm">
                                4.9 (127)
                            </Text>

                            <Text className=" mx-2">•</Text>

                            <MapPin size={14} color="#9CA3AF" />
                            <Text className="text-white ml-1 text-sm">
                                Dhaka, Bangladesh
                            </Text>
                        </View>

                    </View>
                </View>


                {/* Studio Tab Section */}
                <View className="flex-row justify-between p-1 mt-5 bg-[#111111] rounded-2xl">
                    {
                        ["gallery", "equipment", "policy"]?.map((tab) => (
                            <TouchableOpacity
                                key={tab}
                                onPress={() => setActiveTab(tab)}
                                className={`flex-1 py-3 rounded-2xl ${activeTab === tab ? "bg-[#5B2EFF] text-white" : "text-[#4F4F59]"}`}

                            >
                                <Text className={`text-center capitalize ${activeTab === tab ? "text-white" : "text-[#4F4F59]"}`}>
                                    {tab}
                                </Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>

                {/* Tab Content */}
                {activeTab === "gallery" && (
                    <View>

                        <View className="mt-4 bg-[#111111] border border-[#4F4F59] p-4 rounded-2xl">

                            <Text className="text-white text-xl font-semibold mb-3">
                                Studio Gallery
                            </Text>

                            <View className="flex-row flex-wrap justify-between">
                                {[img1, img2, img3, img4].map((item, index) => (
                                    <Image
                                        key={index}
                                        source={item}
                                        className="w-[48%] h-36 rounded-xl mb-3"
                                    />
                                ))}
                            </View>
                        </View>
                        <View className="mt-6 bg-[#111111] border border-[#4F4F59] p-4 rounded-2xl">
                            <Text className="text-white text-xl font-semibold mb-3">
                                About Studio
                            </Text>
                            <Text className="text-white text-md leading-6">
                                Professional recording studio with state-of-the-art equipment and acoustic treatment. Perfect for vocal recording, mixing, and mastering.
                            </Text>
                        </View>
                    </View>
                )}

                {/* Equipment Tab */}

                {activeTab === "equipment" && (
                    <View className="mt-4 bg-[#111111] border border-[#262626] p-5 rounded-[32px]">
                        {/* Title */}
                        <Text className="text-white text-2xl font-bold mb-5">
                            Available Equipment
                        </Text>

                        {/* Equipment Cards */}
                        <View className="gap-y-3">
                            {equipmentList.map((item) => (
                                <View
                                    key={item.id}
                                    className="flex-row items-center bg-black border border-[#262626] p-4 rounded-2xl"
                                >
                                    {/* Icon Circle */}
                                    <View className="w-12 h-12 bg-[#1A1135] rounded-full items-center justify-center mr-4">
                                        {item.icon}
                                    </View>

                                    {/* Text Content */}
                                    <View>
                                        <Text className="text-white text-lg font-semibold">
                                            {item.name}
                                        </Text>
                                        <Text className="text-[#A1A1AA] text-sm">
                                            {item.category}
                                        </Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                )}

                {/* Policy Tab */}

                {activeTab === "policy" && (
                    <View className="mt-6 bg-[#111111] border border-[#4F4F59] p-4 rounded-2xl">
                        <View className="flex-row items-center  gap-3 mb-3">
                            <Shield size={24} color="#5B2EFF" />
                            <Text className="text-white text-2xl font-semibold">
                                Booking Policy
                            </Text>
                        </View>
                        <View className="gap-y-3.5">
                            {policies.map((item) => (
                                <View key={item.id} className="flex-row items-start gap-3">
                                    <View className="w-2 h-2 rounded-full bg-[#5B2EFF] mt-2.5" />

                                    <Text className="text-white text-lg flex-1 leading-7">
                                        {item.text}
                                    </Text>
                                </View>
                            ))}
                        </View>


                    </View>
                )}

            </ScrollView >

            {/* Bottom Fixed Section */}
            <View className="absolute bottom-0 w-full bg-[#111111] py-4 px-5 border-t border-[#4F4F59]">

                <Text className="text-gray-400 text-xl">Hourly Rate</Text>
                <Text className="text-white text-2xl mt-2 font-bold mb-3">
                    $150/hr
                </Text>

                <TouchableOpacity
                    className="bg-[#5B2EFF] py-3 rounded-xl items-center"
                    onPress={() => router.push("/studioBookings/selectDate")}
                >
                    <Text className="text-white text-xl font-semibold">
                        Book This Studio
                    </Text>
                </TouchableOpacity>

            </View>
        </View >
    );
}