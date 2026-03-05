import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { Image, Video } from "lucide-react-native";

export type MediaItem = {
  uri: string;
  name: string;
  mimeType: string | null | undefined;
  type: "photo" | "video";
  size?: number;
};

interface UniversalMediaPickerProps {
  onMediaPicked: (items: MediaItem[]) => void;
  allowVideo?: boolean;
  allowPhoto?: boolean;
}

// ─── Shared permission helper ─────────────────────────────────
const requestLibraryPermission = async (): Promise<boolean> => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "Permission Required",
      "Please allow access to your media library in Settings.",
      [{ text: "OK" }],
    );
    return false;
  }
  return true;
};

const UniversalMediaPicker: React.FC<UniversalMediaPickerProps> = ({
  onMediaPicked,
  allowVideo = true,
  allowPhoto = true,
}) => {
  // ─── Photo: DocumentPicker (gallery) ─────────────────────────
  const pickPhoto = async () => {
    try {
      const granted = await requestLibraryPermission();
      if (!granted) return;

      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: true,
        multiple: true,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const items: MediaItem[] = result.assets.map((a) => ({
          uri: a.uri,
          name: a.name,
          mimeType: a.mimeType ?? null,
          type: "photo",
          size: a.size,
        }));
        onMediaPicked(items);
      }
    } catch (error) {
    }
  };

  // ─── Video: ImagePicker (supports video selection) ────────────
  const pickVideo = async () => {
    try {
      const granted = await requestLibraryPermission();
      if (!granted) return;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsMultipleSelection: false,
        quality: 0.85,
        videoMaxDuration: 120,
      });

      if (!result.canceled && result.assets.length > 0) {
        const items: MediaItem[] = result.assets.map((a) => ({
          uri: a.uri,
          name: `video_${Date.now()}.mp4`,
          mimeType: "video/mp4",
          type: "video",
          size: a.fileSize ?? undefined,
        }));
        onMediaPicked(items);
      }
    } catch (error) {

    }
  };

  return (
    <View className="flex-row gap-3">
      {allowPhoto && (
        <TouchableOpacity
          onPress={pickPhoto}
          className="w-20 h-20 bg-[#101012] border border-[#4F4F59] rounded-xl items-center justify-center"
          activeOpacity={0.7}
        >
          <Image size={24} color="#FFF" />
          <Text className="text-white text-xs mt-1">Photo</Text>
        </TouchableOpacity>
      )}

      {allowVideo && (
        <TouchableOpacity
          onPress={pickVideo}
          className="w-20 h-20 bg-[#101012] border border-[#4F4F59] rounded-xl items-center justify-center"
          activeOpacity={0.7}
        >
          <Video size={24} color="#FFF" />
          <Text className="text-white text-xs mt-1">Video</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UniversalMediaPicker;
