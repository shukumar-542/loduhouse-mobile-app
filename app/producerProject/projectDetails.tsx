import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import { ArrowLeft, CheckCircle, Play, Download, Headphones } from "lucide-react-native";
import { router } from "expo-router";

const ProjectDetails = () => {

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
      className="flex-1 bg-black px-4 pt-6"
      contentContainerStyle={{ paddingBottom: 50 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="flex-row items-center gap-2 mb-2"
      >
        <ArrowLeft color={"white"} size={20} />
        <Text className="text-white text-xl">Back to Projects</Text>
      </TouchableOpacity>

      <View className="mb-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-white text-4xl font-bold">
            Summer Mixtape
          </Text>
          <Text className="text-green-400 text-sm">✓ Completed</Text>
        </View>

        <View className="flex-row justify-between mt-1">
          <Text className="text-white text-md flex-1 mr-2">
            Working on the summer release with collaborative mixing sessions
          </Text>
          <Text className="text-[#5B2EFF]">View Details</Text>
        </View>
      </View>

      {/* Tabs */}
      <View className="flex-row bg-[#111111] rounded-xl p-1 mb-4">
        <View className="flex-1 bg-[#5B2EFF] py-2 rounded-lg">
          <Text className="text-white text-center">File</Text>
        </View>
        <View className="flex-1 py-2">
          <Text className="text-gray-400 text-center">Comments</Text>
        </View>
        <View className="flex-1 py-2">
          <Text className="text-gray-400 text-center">Member</Text>
        </View>
      </View>

      {/* Workflow */}
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

      {/* Engineer */}
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
              Rafsan Ahmed ⭐ 4.9
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
      <View className="bg-[#111111] p-4 rounded-2xl border border-gray-800">
        <Text className="text-white font-semibold mb-2">
          Track_01_Master_v3.wav
        </Text>

        <Text className="text-gray-400 text-xs mb-3">
          v3 • March 1, 2026 • 3:42
        </Text>

        {/* Fake Waveform */}
        <View className="h-10 bg-black rounded-md mb-4" />

        <View className="flex-row gap-3">
          <TouchableOpacity className="flex-1 bg-[#5B2EFF] py-3 rounded-xl flex-row justify-center items-center gap-2">
            <Play color="white" size={16} />
            <Text className="text-white">Play</Text>
          </TouchableOpacity>

          <TouchableOpacity className="flex-1 bg-[#1F1F1F] py-3 rounded-xl flex-row justify-center items-center gap-2">
            <Download color="white" size={16} />
            <Text className="text-white">Download</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProjectDetails;