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
      <View className="px-5 pt-10 pb-4">
        <Text className="text-white text-3xl font-bold tracking-tight">
          Profile
        </Text>
        <Text className="text-zinc-500 text-sm mt-0.5">Manage your studio</Text>
      </View>
    
      {/* Profile Card */}
      <View className=" bg-[#111111] mx-5 border border-[#4F4F59] rounded-2xl">
        <View className="px-4 py-4 flex-row items-center gap-4">
          {/* Avatar */}
          <View className="w-14 h-14 rounded-2xl bg-indigo-600 items-center justify-center overflow-hidden">
            {/* Placeholder avatar with initials */}
            <Text className="text-white text-xl font-bold">LH</Text>
          </View>

          {/* Info */}
          <View className="flex-1">
            <Text className="text-white text-[17px] font-semibold tracking-tight">
              Loud House Studios
            </Text>
            <Text className="text-zinc-400 text-xs mt-0.5">Studio Owner</Text>
          </View>
        </View>

        {/* Contact Details */}
        <View className=" px-4 py-1">
          {/* Email */}
          <View className="flex-row items-center gap-3 py-2 ">
            <Mail color={"#ffff"} size={24} />
            <Text className="text-zinc-300 text-xl">studio@loudhouse.com</Text>
          </View>

          {/* Phone */}
          <View className="flex-row items-center gap-3 py-2 ">
            <Phone color={"#ffff"} size={24} />
            <Text className="text-zinc-300 text-xl">+1 (555) 987-6543</Text>
          </View>

          {/* Address */}
          <View className="flex-row items-center gap-3 py-2">
            <MapPin color={"#ffff"} size={24} />
            <Text className="text-zinc-300 text-xl">
              123 Music Street, Los Angeles, CA
            </Text>
          </View>
        </View>

      </View>



      {/* Appearance */}
      <View className="mx-5 mt-6 ">
        <Text className="text-white text-[17px] font-semibold mb-3">
          Appearance
        </Text>
        <View className="bg-[#111111] border border-[#4F4F59] rounded-2xl px-4 py-4 flex-row items-center justify-between">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-md bg-[#5B2EFF33] items-center justify-center">
              <Moon color={"#5B2EFF"} />
            </View>
            <View>
              <Text className="text-white text-[15px] font-medium">
                Dark Mode
              </Text>
              <Text className="text-zinc-500 text-xs mt-0.5">
                Easy on the eyes
              </Text>
            </View>
          </View>
          <Switch
            value={darkMode}
            onValueChange={setDarkMode}
            trackColor={{ false: "#3f3f46", true: "#6366f1" }}
            thumbColor="#ffffff"
          />
        </View>
      </View>

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
          <SettingsRow label="Studio Setup" route="/(settings)/studio-setup" />
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