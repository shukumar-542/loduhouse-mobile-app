import React from 'react'
import { Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router'
import { ArrowLeft, CheckCircle, Download, Headphones, MessageCircle, Play, User } from 'lucide-react-native'
import UpdateProjectStage from '@/components/UpdateProjectStage'
import ProjectMembers from '@/components/Projectmembers/Projectmembers'
import AddComment from '@/components/AddComment'

const BAR_COUNT = 54

const bars = Array.from({ length: BAR_COUNT }, (_, i) => {
    const seed = Math.sin(i * 127.1 + 311.7) * 43758.5453
    return 0.15 + Math.abs(seed - Math.floor(seed)) * 0.85
})

function OngoingProjectSummary() {
    const router = useRouter()
    const [activeTab, setActiveTab] = React.useState("file")


    const workflowData = [
        {
            title: "Recording",
            desc: "Completed on Feb 20, 2026 by Studio Owner",
        },
        {
            title: "Mixing",
            desc: "Completed on",
        },
        {
            title: "Mastering",
            desc: "Final mastering completed",
        },
        {
            title: "Delivered",
            desc: "Project delivered to client",
        },
    ];

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 50 }}
            className="bg-zinc-950 flex-1 px-4 pt-4 pb-10" showsVerticalScrollIndicator={false}>
            {/* Back button */}
            <Pressable
                onPress={() => router.back()}
                className="flex-row items-center mb-4"
            >
                <ArrowLeft size={22} color="#ffffff" />
                <Text className="text-[#ffffff] text-xl ml-2">Back to Projects</Text>
            </Pressable>

            {/* Main content row */}
            <View className="flex-row items-start justify-between">
                {/* Left: title + description */}
                <View className="flex-1 mr-4">
                    <Text className="text-white font-bold text-4xl leading-tight">
                        Summer Mixtape
                    </Text>
                    <Text className="text-white text-md mt-1 leading-snug">
                        Working on the summer release with{'\n'}collaborative mixing sessions
                    </Text>
                </View>

                {/* Right: action buttons */}
                <View className="items-end gap-y-2">
                    {/* Mixing badge */}
                    <View
                        className="px-5 py-2 rounded-full items-center justify-center"
                        style={{ backgroundColor: '#AD46FF33' }}
                    >
                        <Text className="text-[#C27AFF] text-sm font-semibold">Mixing</Text>
                    </View>

                    {/* Chat button */}
                    <Pressable
                        onPress={() => router.push('/chat')}
                        className="flex-row items-center px-4 py-2 mt-2 rounded-full bg-[#111111]"
                    >
                        <MessageCircle size={13} color="#5B2EFF" />
                        <Text className="text-[#5B2EFF] text-sm ml-1.5">Chat</Text>
                    </Pressable>

                    {/* View Details link */}
                    <Pressable onPress={() => router.push('/producerProject/pendingProjectDetails/:id')} className="px-4 py-2 rounded-full ">
                        <Text style={{ color: '#5B2EFF' }} className="text-md font-medium">
                            View Details
                        </Text>
                    </Pressable>
                </View>
            </View>

            {/* Tabs */}

            <View className="flex-row justify-between p-1 mt-5 bg-[#111111] rounded-2xl mb-5">
                {
                    ["file", "comments", "member"]?.map((tab) => (
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

            {/* Workflow  section */}
            <View className="bg-[#111111] p-4 rounded-2xl border border-gray-800 mb-4">
                <Text className="text-white text-3xl font-semibold mb-4">
                    Project Workflow
                </Text>

                {workflowData.map((item, i) => (
                    <View
                        key={i}
                        className="flex-row justify-between items-start mb-6"
                    >
                        {/* LEFT SIDE */}
                        <View className="flex-row flex-1">
                            {/* Icon */}
                            <View className="w-12 h-12 rounded-md bg-[#00C95022] items-center justify-center mr-4">
                                <CheckCircle color="#22c55e" size={22} />
                            </View>

                            {/* Text */}
                            <View className="flex-1">
                                <Text className="text-white text-xl font-semibold">
                                    {item.title}
                                </Text>

                                <Text className="text-gray-400 text-sm mt-1 leading-5">
                                    {item.desc}
                                </Text>
                            </View>
                        </View>

                        {/* RIGHT SIDE */}
                        <Text className="text-[#00E676] text-sm font-medium ml-2">
                            ✓ Completed
                        </Text>
                    </View>
                ))}
            </View>
            <UpdateProjectStage />

            {
                activeTab === "file" && <View>
                    <View className="bg-[#111111] p-4 rounded-2xl border border-gray-800 mb-4">
                        <View className="flex-row items-center gap-2 mb-3">
                            <Headphones color={"#5B2EFF"} />

                            <Text className="text-white text-xl font-semibold ">
                                Engineer
                            </Text>
                        </View>

                        <View className="flex-row items-center bg-black p-3 rounded-xl">
                            <Image
                                source={{
                                    uri: "https://randomuser.me/api/portraits/men/32.jpg",
                                }}
                                className="w-14 h-14 rounded-full mr-3"
                            />

                            <View>
                                <Text className="text-white text-xl font-semibold mb-1">
                                    Shukumar  ⭐ 4.9
                                </Text>
                                <Text className="text-gray-400 text-sm mb-1">
                                    Mixing & Mastering Specialist
                                </Text>
                                <Text className="text-purple-400 text-xs">
                                    8+ years experience
                                </Text>
                            </View>
                        </View>
                    </View>
                    {/* File Card */}
                    <View className="bg-[#111114] rounded-3xl p-5 w-full max-w-[380px] border border-[#1E1E2A] self-center">

                        {/* File Info */}
                        <Text className="text-white text-lg font-bold tracking-tight mb-1" numberOfLines={1}>
                            Track_01_Master_v3.wav
                        </Text>
                        <Text className="text-[#666680] text-sm font-medium mb-5">
                            v3 • March 1, 2026 • 3:42
                        </Text>

                        {/* Waveform (static) */}
                        <View className="flex-row items-center h-14 bg-[#0A0A0F] rounded-xl px-2.5 mb-5 overflow-hidden">
                            {bars.map((h, i) => (
                                <View
                                    key={i}
                                    className="bg-[#5B2EFF] rounded-sm mx-[1.5px]"
                                    style={{ width: 3, height: h * 44 }}
                                />
                            ))}
                        </View>

                        {/* Buttons */}
                        <View className="flex-row gap-x-3">
                            {/* Play → navigate */}
                            <TouchableOpacity
                                onPress={() => router.push('/audioPlayers/audioPlayer')}
                                activeOpacity={0.8}
                                className="flex-1 bg-[#5B2EFF] rounded-2xl py-3.5 flex-row items-center justify-center gap-x-2"
                            >
                                <Play size={18} color="#fff" fill="#fff" />
                                <Text className="text-white font-bold text-base">Play</Text>
                            </TouchableOpacity>

                            {/* Download */}
                            <TouchableOpacity
                                activeOpacity={0.8}
                                className="flex-1 bg-[#1A1A24] rounded-2xl py-3.5 flex-row items-center justify-center gap-x-2 border border-[#2A2A3A]"
                            >
                                <Download size={18} color="#fff" />
                                <Text className="text-white font-bold text-base">Download</Text>
                            </TouchableOpacity>
                        </View>

                    </View>


                </View>
            }
            {
                activeTab === "comments" && <View>
                    <View className="text-white bg-[#111111] p-4 rounded-2xl border border-gray-800">
                        <View className="flex-row gap-5 border-b  border-[#4F4F59] pb-5">
                            <View>
                                <View className="bg-[#5B2EFF33] p-2 rounded-md">
                                    <User color={"#5B2EFF"} />
                                </View>
                            </View>
                            <View>
                                <Text className="text-white text-xl font-semibold">Studio Owner</Text>
                                <Text className="text-white text-sm">3 hours ago</Text>
                                <Text className="text-gray-400 text-xl mt-2">Latest mix is ready for review</Text>
                            </View>


                        </View>
                        <View className="flex-row gap-5 pt-5 pb-5">
                            <View>
                                <View className="bg-[#4F4F59] p-2 rounded-md">
                                    <User color={"#FFFFFF"} />
                                </View>
                            </View>
                            <View className="flex-1">
                                <Text className="text-white text-xl font-semibold">You</Text>
                                <Text className="text-white text-sm">2 hours ago</Text>
                                <Text className="text-gray-400 text-xl mt-2 ">Sounds great! Can we boost the vocals a bit?</Text>
                            </View>


                        </View>
                    </View>
                    <AddComment />
                </View>
            }
            {
                activeTab === "member" && <View className="bg-[#111111] p-4 rounded-2xl border border-gray-800">
                    <ProjectMembers />
                </View>
            }


        </ScrollView>
    )
}

export default OngoingProjectSummary