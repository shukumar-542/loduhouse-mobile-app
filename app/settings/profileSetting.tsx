import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
// import { TextField } from "@/components/shared/TextField";
import { MobileNumberInput } from "@/components/shared/PhoneNumberField";
import Header from "@/components/shared/Header";
import useEditUserProfile from "@/services/hooks/settings/useEditUserProfile";
import UniversalMediaPicker, {
  MediaItem,
} from "@/components/shared/UniversalMediaPicker";

export default function ProfileSetting() {
  const {
    name,
    setName,
    phone,
    setPhone,
    email,
    location,
    setLocation,
    avatarUri,
    setAvatarUri,
    loading,
    error,
    successMessage,
    saveProfile,
  } = useEditUserProfile();

  const [pickerVisible, setPickerVisible] = useState(false);

  const handleMediaPicked = (items: MediaItem[]) => {
    if (items.length > 0) {
      setAvatarUri(items[0].uri);
    }
    setPickerVisible(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0F0B18]">
      <Header title="Profile Setting" />

      {(error || successMessage) && (
        <View className="px-5 pt-3">
          {error && (
            <View className="px-4 py-3 bg-red-500/20 border border-red-500 rounded-xl">
              <Text className="text-red-400 text-sm font-medium text-center">
                {error}
              </Text>
            </View>
          )}
          {successMessage && (
            <View className="px-4 py-3 bg-[#C9A367]/20 border border-[#C9A367] rounded-xl">
              <Text className="text-[#C9A367] text-sm font-medium text-center">
                {successMessage}
              </Text>
            </View>
          )}
        </View>
      )}

      <ScrollView
        contentContainerStyle={{ paddingBottom: 40 }}
        className="flex-1 px-5 pt-6"
        keyboardShouldPersistTaps="handled"
      >
        <View className="items-center mb-10">
          <View className="relative w-24 h-24">
            <Image
              source={{
                uri: avatarUri ?? "https://i.pravatar.cc/150?img=12",
              }}
              className="w-24 h-24 rounded-full border-2 border-[#C9A367]"
            />
            <TouchableOpacity
              onPress={() => setPickerVisible(true)}
              className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#C9A367] items-center justify-center"
              activeOpacity={0.8}
            >
              <Text className="text-[#0E0E0E] text-base">📷</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <TextField
          label="Your Name"
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
        /> */}

        <MobileNumberInput
          label="Mobile Number"
          placeholder="Enter phone number"
          value={phone}
          onChangeText={setPhone}
        />

        {/* <TextField
          label="Email"
          value={email}
          editable={false}
          placeholder="Your email address"
          disabledClassName="bg-gray-800"
        /> */}

        {/* <TextField
          label="Location"
          placeholder="Enter your location"
          value={location}
          onChangeText={setLocation}
        /> */}
      </ScrollView>

      <View className="px-5 pb-8">
        <TouchableOpacity
          onPress={saveProfile}
          disabled={loading}
          className={`rounded-2xl py-4 items-center ${loading ? "bg-[#C9A367]/50" : "bg-[#C9A367]"}`}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#0E0E0E" />
          ) : (
            <Text className="text-[#0E0E0E] text-base font-bold tracking-widest uppercase">
              Save
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Image Picker Modal */}
      <Modal
        visible={pickerVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPickerVisible(false)}
      >
        <TouchableOpacity
          className="flex-1 bg-black/60 justify-end"
          activeOpacity={1}
          onPress={() => setPickerVisible(false)}
        >
          <View className="bg-[#121217] rounded-t-3xl px-6 pt-6 pb-10">
            <Text className="text-white text-lg font-bold mb-1">
              Update Profile Photo
            </Text>
            <Text className="text-[#7d848d] text-sm mb-6">
              Choose a photo from your library
            </Text>

            <UniversalMediaPicker
              onMediaPicked={handleMediaPicked}
              allowPhoto={true}
              allowVideo={false}
            />

            <TouchableOpacity
              onPress={() => setPickerVisible(false)}
              className="mt-6 py-3 items-center border border-[#2a2a2f] rounded-xl"
            >
              <Text className="text-[#7d848d] text-base font-medium">
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}
