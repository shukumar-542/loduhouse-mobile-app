import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { User, Phone, Mail, Camera } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";

interface EditProfileFormProps {
  name?: string;
  profileImage: string;
  phone?: string;
  email?: string;
  notes?: string;
  isLoading?: boolean;
  onSave?: (data: {
    fullName: string;
    phoneNumber: string;
    email: string;
    notes: string;
    image: string;
  }) => void;
  registerSave?: (fn: () => void) => void;
}

const EditProfileForm: React.FC<EditProfileFormProps> = ({
  name = "",
  profileImage,
  phone = "",
  email = "",
  notes = "",
  isLoading = false,
  onSave,
  registerSave,
}) => {
  const [fullName, setFullName] = useState(name);
  const [phoneNumber, setPhoneNumber] = useState(phone);
  const [emailVal, setEmailVal] = useState(email);
  const [notesVal, setNotesVal] = useState(notes);
  const [imageUri, setImageUri] = useState(profileImage);

  const handlePickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]?.uri) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    onSave?.({
      fullName,
      phoneNumber,
      email: emailVal,
      notes: notesVal,
      image: imageUri,
    });
  };

  useEffect(() => {
    registerSave?.(handleSave);
  }, [fullName, phoneNumber, emailVal, notesVal, imageUri]);

  return (
    <View className="w-full px-6 pt-10 pb-6">
      {/* Profile Image */}
      <View className="items-center mb-8">
        <TouchableOpacity
          onPress={handlePickImage}
          disabled={isLoading}
          activeOpacity={0.8}
          className="relative"
        >
          <View className="w-24 h-24 rounded-full border-2 border-zinc-800 overflow-hidden bg-zinc-900">
            {isLoading ? (
              <View className="w-full h-full items-center justify-center bg-zinc-900">
                <ActivityIndicator size="small" color="#C9A367" />
              </View>
            ) : (
              <Image
                source={
                  imageUri
                    ? { uri: imageUri }
                    : require("@/assets/images/Avater.png")
                }
                className="w-full h-full"
                resizeMode="cover"
              />
            )}
          </View>

          {/* Camera badge */}
          <View
            className="absolute bottom-0 right-0 rounded-full p-1.5"
            style={{ backgroundColor: "#C9A367" }}
          >
            <Camera size={14} color="#0F0B18" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Form Fields */}
      <View className="gap-y-5">
        <InputGroup
          label="Full Name"
          icon={<User size={20} color="#52525b" />}
          placeholder="Isabella Rossi"
          value={fullName}
          onChangeText={setFullName}
        />
        <InputGroup
          label="Phone Number"
          icon={<Phone size={20} color="#52525b" />}
          placeholder="+1 (555) 123-4567"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <InputGroup
          label="Email Address"
          icon={<Mail size={20} color="#52525b" />}
          placeholder="isabella.r@example.com"
          value={emailVal}
          onChangeText={setEmailVal}
        />

        {/* Notes */}
        <View className="gap-y-2">
          <Text className="text-zinc-400 text-sm font-medium ml-1">Notes</Text>
          <TextInput
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            className="w-full bg-[#101012] border border-[#4F4F59] rounded-2xl p-4 text-zinc-300 min-h-[120px]"
            placeholder="Prefers warm tones. Sensitive scalp."
            placeholderTextColor="#3f3f46"
            value={notesVal}
            onChangeText={setNotesVal}
          />
        </View>
      </View>
    </View>
  );
};

interface InputGroupProps {
  label: string;
  icon: React.ReactNode;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
}) => (
  <View className="gap-y-2">
    <Text className="text-zinc-400 text-sm font-medium ml-1">{label}</Text>
    <View className="relative flex-row items-center">
      <View className="absolute left-4 z-10">{icon}</View>
      <TextInput
        className="w-full bg-[#101012] border border-[#4F4F59] rounded-2xl py-4 pl-12 pr-4 text-zinc-300 font-medium"
        placeholder={placeholder}
        placeholderTextColor="#3f3f46"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  </View>
);

export default EditProfileForm;
