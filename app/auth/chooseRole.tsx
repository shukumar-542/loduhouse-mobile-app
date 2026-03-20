import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { User, Mic2, Music } from 'lucide-react-native'; // Optional icons
import artistImg from "@/assets/images/artist.png"
import producerImg from "@/assets/images/producer.png"
import { router } from 'expo-router';

const ChooseRole = () => {
  const [selectedRole, setSelectedRole] = useState('artist');

  const handleChooseRole = () => {
    if (selectedRole === 'producer') {
      router.push("/producer/dashboard")
    }
    else router.push("/artist/home")


  }

  return (
    <View className="flex-1 bg-black px-6 py-8">
      {/* Header Section */}
      <View className="mb-10">
        <Text className="text-white text-4xl font-bold">I am...</Text>
        <Text className="text-gray-400 text-lg mt-2">Choose your role</Text>
      </View>

      {/* Role Selection Cards */}
      <View className="space-y-10">

        {/* Artist Card */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setSelectedRole('artist')}
          className={`relative p-6 rounded-[32px] border-2 items-center justify-center ${selectedRole === 'artist'
              ? 'bg-[#6339FF] border-[#6339FF]'
              : 'bg-[#121212] border-zinc-800'
            }`}
        >
          {/* Custom Radio Circle */}
          <View className="absolute top-5 right-5 w-6 h-6 rounded-full border-2 border-white items-center justify-center">
            {selectedRole === 'artist' && <View className="w-3 h-3 rounded-full bg-white" />}
          </View>

          <View className="bg-black/20 p-4 rounded-2xl mb-4">
            <Image
              source={artistImg}
              className=""
              resizeMode="contain"
            />
          </View>

          <Text className="text-white text-2xl font-bold mb-2">Artist</Text>
          <Text className="text-white/80 text-center text-sm px-4 leading-5">
            Books studio sessions and manages audio projects in a private workspace.
          </Text>
        </TouchableOpacity>

        {/* Producer Card */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setSelectedRole('producer')}
          className={`relative p-6 rounded-[32px] mt-12 border-2 items-center justify-center ${selectedRole === 'producer'
              ? 'bg-[#6339FF] border-[#6339FF]'
              : 'bg-[#121212] border-zinc-800'
            }`}
        >
          {/* Custom Radio Circle */}
          <View className="absolute top-5 right-5 w-6 h-6 rounded-full border-2 border-white/30 items-center justify-center">
            {selectedRole === 'producer' && <View className="w-3 h-3 rounded-full bg-white" />}
          </View>

          <View className="bg-white/5 p-4 rounded-2xl mb-4">
            <Image
              source={producerImg}
              className=""
              resizeMode="contain"
            />
          </View>

          <Text className="text-white text-2xl font-bold mb-2">Producer</Text>
          <Text className="text-gray-400 text-center text-sm px-4 leading-5">
            Controls bookings and manages studio projects.
          </Text>
        </TouchableOpacity>

      </View>

      {/* Bottom Action Button */}
      <View className="flex-1 justify-end mb-4">
        <TouchableOpacity
          className="bg-[#6339FF] w-full py-5 rounded-2xl items-center"
          onPress={handleChooseRole}
        >
          <Text className="text-white text-lg font-bold">Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChooseRole;