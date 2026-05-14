import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { useState } from "react";
import { ChevronRight, LogOut, Mail, MapPin, Moon, Phone } from "lucide-react-native";
import { router } from "expo-router";
import ProfileCard from "@/components/ProfileCard/ProfileCard";

type SettingProps = {
  label  : string, 
  route : string
}

const SettingsRow = ({ label , route }: SettingProps) => (
  <TouchableOpacity
    className="flex-row items-center justify-between py-4 "
    activeOpacity={0.6}
    onPress={()=> router.push(route)}
  >
    <Text className="text-white text-[15px] font-normal">{label}</Text>
    <ChevronRight size={22} color={"white"} />
  </TouchableOpacity>
);

export default function Profile() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ScrollView
      className="flex-1 bg-zinc-950"
      contentContainerStyle={{ paddingBottom: 110 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
     
    
      {/* Profile Card */}
      <ProfileCard/>



    

      {/* Stats */}
      <View className="mx-5 mt-6 flex-row gap-3">
        {/* Revenue */}
        <View className="flex-1 bg-[#111111] rounded-2xl p-4 items-start">
          <Text className="text-white text-xl font-bold">$12,450</Text>
          <Text className="text-zinc-500 text-xs mt-1">Revenue</Text>
        </View>
        {/* Sessions */}
        <View className="flex-1 bg-[#111111] rounded-2xl p-4 items-start">
          <Text className="text-white text-xl font-bold">28</Text>
          <Text className="text-zinc-500 text-xs mt-1">Sessions</Text>
        </View>
        {/* Pending */}
        <View className="flex-1 bg-[#111111] rounded-2xl p-4 items-start">
          <Text className="text-white text-xl font-bold">3</Text>
          <Text className="text-zinc-500 text-xs mt-1">Pending</Text>
        </View>
      </View>

      {/* Settings */}
      <View className="mx-5 mt-6 bg-[#111111] rounded-2xl px-4">
        <Text className="text-white text-[20px] font-semibold mb-3 border-b border-[#4F4F59] py-4">
          Settings
        </Text>
        <View className="mb-2">
          <SettingsRow label="Profile Setting" route="/settings/profileSetting" />
          <SettingsRow label="Team Member"  route="/settings/teamMembers"  />
          <SettingsRow label="Studio Setup" route="/settings/create-studio" />
          <SettingsRow label="Change password"  route="/settings/changePasswordFromSettings"  />
          <SettingsRow label="About Us" route="/settings/aboutUs" />
          <SettingsRow label="Privacy Policy" route="/settings/privacyPolicy" />
          <SettingsRow label="Terms and Conditions" route="/settings/terms" />
          
        </View>
      </View>

      {/* Sign Out */}
      <TouchableOpacity
        className="mx-5 mt-5 flex-row items-center justify-center  py-4 rounded-2xl "
        activeOpacity={0.7}
      >
        <LogOut color={"#FF6467"} size={20} />
        <Text className="text-red-400 text-[15px] font-medium">  Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}