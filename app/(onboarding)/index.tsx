import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar, Users, Sparkles } from "lucide-react-native";
import { router } from "expo-router";
import logo from "@/assets/images/Loog.png";
import { FeatureCard } from "@/components/FeatureCard/FeatureCard";
import { PrimaryButton } from "@/components/shared/PrimaryButton";



export default function OnboardingScreen() {

  const handleNext = () => {
    router.push("/auth/login");
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0F0B18] px-6 justify-between">

      {/* Top Section */}
      <View className="items-center mt-10">
        <Image
          source={logo}
          resizeMode="contain"
          style={{ width: 160, height: 80 }}
        />

        <Text className="text-white text-lg mt-2">
          Premium Studio Management
        </Text>
      </View>

      {/* Middle Section */}
      <View className="gap-y-4">

        <FeatureCard
          title="Studio Booking"
          description="Book premium studios with ease"
          icon={<Calendar color="#5B2EFF" size={20} />}
        />

        <FeatureCard
          title="Collaboration"
          description="Work together seamlessly"
          icon={<Users color="#5B2EFF" size={20} />}
        />

        <FeatureCard
          title="Premium Features"
          description="Professional tools for artists"
          icon={<Sparkles color="#5B2EFF" size={20} />}
        />

      </View>

      {/* Bottom Section */}
      <View className="mb-6">

         <PrimaryButton
            label={"Get Started"}
            onPress={handleNext}
          />

        <Text className="text-center text-gray-400 mt-4">
          I Already Have an Account
        </Text>

        <Text className="text-center text-gray-500 text-xs mt-4 px-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </Text>

      </View>

    </SafeAreaView>
  );
}