import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { Bell, Calendar, Mic, Music, Volume2, CheckCircle, Folder } from "lucide-react-native";
import { router } from "expo-router";

const StatusCard = ({ icon, count, label, bgColor }: any) => {
  return (
    <View className="w-[48%] bg-[#111111] border border-gray-800 rounded-2xl p-4 m-1">

      <View className="flex-row items-center gap-3">
        <View className={`w-10 h-10 rounded-lg items-center justify-center mb-2`} style={{ backgroundColor: bgColor }}>
          {icon}
        </View>
        <View>
          <Text className="text-white text-2xl font-semibold">{count}</Text>
          <Text className="text-gray-400 text-sm">{label}</Text>
        </View>
      </View>
    </View>
  );
};

const ProjectItem = ({ title, status, color }: any) => {
  return (
    <View className="flex-row items-center justify-between bg-[#111111] border border-[#4F4F59] rounded-2xl p-4 mb-3">

      <View className="flex-row items-center gap-3">
        <View className="w-10 h-10 rounded-lg bg-[#201059] items-center justify-center">
          <Folder color="#5B2EFF" size={20} />
        </View>

        <Text className="text-white text-base font-medium">{title}</Text>
      </View>

      <View className={`px-3 py-1 rounded-full`} style={{ backgroundColor: color }}>
        <Text className="text-white text-xs">{status}</Text>
      </View>

    </View>
  );
};

export default function Home() {
  return (
    <ScrollView className="flex-1 bg-black px-4 pt-10"
      contentContainerStyle={{ paddingBottom: 120 }}
    >

      {/* Header */}
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-white text-3xl font-bold">Welcome Back</Text>
          <Text className="text-gray-200 text-md font-medium">
            Here's what's happening today
          </Text>
        </View>

        <TouchableOpacity
        onPress={() => router.push("/notification")}
        className="w-10 h-10 rounded-xl bg-[#111827] items-center justify-center border border-gray-800">
          <Bell color="white" size={20} />
        </TouchableOpacity>
      </View>

      {/* Button */}
      <TouchableOpacity className="bg-[#7C3AED] py-4 rounded-xl flex-row items-center justify-center mb-6">
        <Calendar color="white" size={18} />
        <Text className="text-white ml-2 font-semibold">
          Book Studio Session
        </Text>
      </TouchableOpacity>

      {/* Project Status */}
      <Text className="text-white text-lg font-semibold mb-3">
        Project Status
      </Text>

      <View className="flex-row flex-wrap">
        <StatusCard
          icon={<Mic color="white" size={18} />}
          count="1"
          label="Recording"
          bgColor="#1E3A8A"
        />

        <StatusCard
          icon={<Music color="white" size={18} />}
          count="2"
          label="Mixing"
          bgColor="#6D28D9"
        />

        <StatusCard
          icon={<Volume2 color="white" size={18} />}
          count="1"
          label="Mastering"
          bgColor="#92400E"
        />

        <StatusCard
          icon={<CheckCircle color="white" size={18} />}
          count="0"
          label="Delivered"
          bgColor="#065F46"
        />
      </View>

      {/* Active Projects */}
      <Text className="text-white text-lg font-semibold mt-6 mb-3">
        Active Projects
      </Text>

      <ProjectItem
        title="Summer Mixtape"
        status="Mixing"
        color="#6D28D9"
      />

      <ProjectItem
        title="Album Recording"
        status="Recording"
        color="#1E3A8A"
      />

      <ProjectItem
        title="EP Mastering"
        status="Mastering"
        color="#BE185D"
      />

      <ProjectItem
        title="Single Track"
        status="Mixing"
        color="#6D28D9"
      />
      <ProjectItem
        title="Single Track"
        status="Mixing"
        color="#6D28D9"
      />
      <ProjectItem
        title="Single Track"
        status="Mixing"
        color="#6D28D9"
      />
      <ProjectItem
        title="Single Track"
        status="Mixing"
        color="#6D28D9"
      />
      <ProjectItem
        title="Single Track"
        status="Mixing"
        color="#6D28D9"
      />

    </ScrollView>
  );
}