import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { ArrowLeft, MapPin, Star } from "lucide-react-native";

export default function StudioDetails() {
    const { id } = useLocalSearchParams();

    return (
        <View className="flex-1 bg-black px-4 pt-3">
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
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
                            <Text className="text-gray-400 ml-1 text-sm">
                                4.9 (127)
                            </Text>

                            <Text className="text-gray-500 mx-2">•</Text>

                            <MapPin size={14} color="#9CA3AF" />
                            <Text className="text-gray-400 ml-1 text-sm">
                                Dhaka, Bangladesh
                            </Text>
                        </View>

                    </View>
                </View>

            </ScrollView>
        </View>
    );
}