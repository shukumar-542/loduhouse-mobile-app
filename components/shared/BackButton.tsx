import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router';

type BackButtonProps = {
    title : string,
    subTitle: string
    
}
export default function BackButton({title, subTitle}: BackButtonProps) {
    const router = useRouter();
    return (
        <View>
            <View className="flex-row items-center gap-3 mb-5">
                <TouchableOpacity className="w-8 h-8 items-center justify-center" onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={22} color="#fff" />
                </TouchableOpacity>
                <View>
                    <Text className="text-white text-xl font-bold">{title}</Text>
                    <Text className="text-gray-400 text-xs">{subTitle}</Text>
                </View>
            </View>

        </View>
    )
}