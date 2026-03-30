import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { ArrowLeft, FileText, FolderOpen, MessageSquare } from 'lucide-react-native'
import { router } from 'expo-router'
import FormCard from '@/components/shared/FormCard';
import Field from '@/components/shared/TextField';

export default function bookingDetails() {
    const [projectName, setProjectName] = useState("");



    return (
        <View className="flex-1 bg-black px-4 pt-6">

            {/* Header */}
            <View className="flex-row  gap-3">
                <TouchableOpacity onPress={() => router.back()}>
                    <ArrowLeft color="white" size={24} />
                </TouchableOpacity>

                <View>
                    <Text className="text-white text-xl font-semibold">
                        Booking Details
                    </Text>
                    <Text className="text-gray-400 text-sm">Step 3 of 3</Text>
                </View>
            </View>

            {/* Progress */}
            <View className="flex-row mt-4 gap-2">
                <View className="flex-1 h-1 bg-[#5B2EFF] rounded-full" />
                <View className="flex-1 h-1 bg-[#5B2EFF] rounded-full" />
                <View className="flex-1 h-1 bg-[#5B2EFF] rounded-full" />
            </View>

            {/* Booking Summary */}
            <ScrollView className="flex-1"
                contentContainerStyle={{
                    paddingTop: 16,
                    paddingBottom: 40,
                }}
                showsVerticalScrollIndicator={false}
            >
                <View className='mt-4'>
                    <View className="bg-[#111111] mt-6 p-4 rounded-2xl border border-gray-800">
                        <Text className="text-white font-semibold text-lg">
                            Booking Summary
                        </Text>
                        <View className="flex-row mt-4 gap-3">
                            <View className="flex-1">
                                <Text className="text-gray-400 text-md">Date</Text>
                            </View>
                            <View className="flex-1">
                                <Text className="text-white font-semibold">
                                    Monday, March 2
                                </Text>
                            </View>
                        </View>
                        <View className="flex-row mt-4 gap-3">
                            <View className="flex-1">
                                <Text className="text-gray-400 text-md">Time</Text>
                            </View>
                            <View className="flex-1">
                                <Text className="text-white font-semibold">
                                    09:00 AM—10:00 AM
                                </Text>
                            </View>
                        </View>
                        <View className="flex-row mt-4 gap-3">
                            <View className="flex-1">
                                <Text className="text-gray-400 text-md">Duration</Text>
                            </View>
                            <View className="flex-1">
                                <Text className="text-white font-semibold">
                                    2 hours
                                </Text>
                            </View>
                        </View>
                    </View>


                    {/* Input Fields */}
                    {/* Project Name  */}
                    <FormCard
                        title="Project Name"
                        icon={<FolderOpen color="#5B2EFF" size={22} />}
                    >
                        <Field
                            placeholder="e.g., Summer Mixtape"
                            value={projectName}
                            onChangeText={setProjectName}
                        />
                    </FormCard>
                    {/* Project Description */}
                    <FormCard
                        title="Project Description"
                        icon={<FileText color="#5B2EFF" size={22} />}
                    >
                        <Field
                            placeholder="Describe your Project"
                            value={projectName}
                            onChangeText={setProjectName}
                            multiline
                        />
                    </FormCard>
                    {/* Session Type */}
                    {/* Number of attendees */}

                    {/* Session Note */}
                    <FormCard
                        title="Session Notes"
                        icon={<MessageSquare color="#5B2EFF" size={22} />}
                    >
                        <Field
                            placeholder="Any special requirements or notes..."
                            value={projectName}
                            onChangeText={setProjectName}
                            multiline
                        />
                    </FormCard>

                    {/* Additional Notes */}
                    <FormCard
                        title="Additional Notes"
                        icon={<MessageSquare color="#5B2EFF" size={22} />}
                    >
                        <Field
                            placeholder="Any additional information..."
                            value={projectName}
                            onChangeText={setProjectName}
                            multiline
                        />
                    </FormCard>
                </View>
            </ScrollView>

        </View>
    )
}