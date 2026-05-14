import ProfileCard from "@/components/ProfileCard/ProfileCard";
import { router } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";

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
  return (
    <ScrollView
      className="flex-1 bg-zinc-950"
      contentContainerStyle={{ paddingBottom: 110 }}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <ProfileCard />
      </View>
      {/* Settings */}
      <View className="mx-5 mt-6 bg-[#111111] rounded-2xl px-4">
        <Text className="text-white text-[20px] font-semibold mb-3 border-b border-[#4F4F59] py-4">
          Settings
        </Text>
        <View className="mb-2">
          <SettingsRow label="Profile Setting" route="/settings/profileSetting" />
          <SettingsRow label="Change password" route="/settings/changePasswordFromSettings" />
          <SettingsRow label="About Us" route="/settings/aboutUs" />
          <SettingsRow label="Privacy Policy" route="/settings/privacyPolicy" />
          <SettingsRow label="Terms and Conditions" route="/settings/terms" />

        </View>
      </View>
    </ScrollView>
  );
}