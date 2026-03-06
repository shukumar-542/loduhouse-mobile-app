import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Camera, User, Mail, FileText } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { MobileNumberInput } from "@/components/shared/PhoneNumberField";

// ─── Types ────────────────────────────────────────────────────
export interface ClientFormData {
  photo: string | null;
  fullName: string;
  phoneNumber: string;
  email: string;
  notes: string;
}

export type SetClientField = (
  key: keyof ClientFormData,
  value: ClientFormData[keyof ClientFormData],
) => void;

interface CreateNewClientFormProps {
  formData: ClientFormData;
  setField: SetClientField;
}

// ─── Field Row ────────────────────────────────────────────────
interface FieldProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}
const Field: React.FC<FieldProps> = ({ label, icon, children }) => (
  <View className="mb-5">
    <Text className="text-white font-semibold text-base mb-2">{label}</Text>
    <View
      className="flex-row items-center rounded-2xl px-4"
      style={{
        backgroundColor: "#111118",
        borderWidth: 1,
        borderColor: "#2e2e3a",
        minHeight: 52,
      }}
    >
      <View className="mr-3 opacity-50">{icon}</View>
      {children}
    </View>
  </View>
);

// ─── Main Component ───────────────────────────────────────────
const CreateNewClientForm: React.FC<CreateNewClientFormProps> = ({
  formData,
  setField,
}) => {
  const [photoUri, setPhotoUri] = useState<string | null>(formData.photo);

  const pickPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    });
    if (!result.canceled && result.assets[0]) {
      const uri = result.assets[0].uri;
      setPhotoUri(uri);
      setField("photo", uri);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* ── Photo Picker ── */}
        <View className="items-center mt-4 mb-8">
          <TouchableOpacity onPress={pickPhoto} activeOpacity={0.8}>
            {photoUri ? (
              <View
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 55,
                  borderWidth: 2,
                  borderColor: "#C9A367",
                  overflow: "hidden",
                }}
              >
                <Image
                  source={{ uri: photoUri }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                />
              </View>
            ) : (
              <View
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 55,
                  borderWidth: 1.5,
                  borderColor: "#3a3a4a",
                  backgroundColor: "#111118",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                <Camera size={28} color="#94a3b8" />
                <Text
                  style={{ color: "#94a3b8", fontSize: 16, fontWeight: "500" }}
                >
                  Add Photo
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* ── Full Name ── */}
        <Field label="Full Name" icon={<User size={18} color="#94a3b8" />}>
          <TextInput
            className="flex-1 text-white text-sm"
            placeholder="e.g. Sarah Connor"
            placeholderTextColor="#3a3a50"
            value={formData.fullName}
            onChangeText={(v: string) => setField("fullName", v)}
            autoCapitalize="words"
            returnKeyType="next"
          />
        </Field>

        {/* ── Phone Number ── */}
        <MobileNumberInput
          label="Phone Number"
          placeholder="1234567890"
          value={formData.phoneNumber}
          onChangeText={(v: string) => setField("phoneNumber", v)}
        />

        {/* ── Email ── */}
        <Field label="Email" icon={<Mail size={18} color="#94a3b8" />}>
          <TextInput
            className="flex-1 text-white text-sm"
            placeholder="sarah@example.com"
            placeholderTextColor="#3a3a50"
            value={formData.email}
            onChangeText={(v: string) => setField("email", v)}
            keyboardType="email-address"
            autoCapitalize="none"
            returnKeyType="next"
          />
        </Field>

        {/* ── Notes ── */}
        <View className="mb-5">
          <Text className="text-white font-semibold text-sm mb-2">Notes</Text>
          <View
            style={{
              backgroundColor: "#111118",
              borderWidth: 1,
              borderColor: "#2e2e3a",
              borderRadius: 16,
              padding: 14,
              flexDirection: "row",
              alignItems: "flex-start",
            }}
          >
            <View style={{ marginRight: 10, marginTop: 2, opacity: 0.5 }}>
              <FileText size={18} color="#94a3b8" />
            </View>
            <TextInput
              style={{ flex: 1, color: "#fff", fontSize: 14, minHeight: 100 }}
              placeholder="Allergies, preferences, how you met..."
              placeholderTextColor="#3a3a50"
              value={formData.notes}
              onChangeText={(v: string) => setField("notes", v)}
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateNewClientForm;
