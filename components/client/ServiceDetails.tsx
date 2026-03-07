import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import Video from "react-native-video";
import { useGetServiceDetails } from "@/services/hooks/home/useGetServiceDetails";

interface Props {
  id: string;
}

type MediaItem = {
  uri: string;
  type: "image" | "video";
};

const ServiceDetails: React.FC<Props> = ({ id }) => {
  const { service, total, isLoading, isError } = useGetServiceDetails(id);

  const [playingUri, setPlayingUri] = useState<string | null>(null);
  const [fullscreenMedia, setFullscreenMedia] = useState<MediaItem | null>(
    null,
  );

  const { width, height } = Dimensions.get("window");

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#0F0B18]">
        <ActivityIndicator size="large" color="#C9A367" />
      </View>
    );
  }

  if (isError || !service) {
    return (
      <View className="flex-1 items-center justify-center bg-[#0F0B18]">
        <Text className="text-white">Failed to load visit details.</Text>
      </View>
    );
  }

  const serviceTypes = service.serviceType
    .split(",")
    .map((s: string) => s.trim())
    .filter(Boolean);

  const allMedia: MediaItem[] = [
    ...(service.photos ?? []).map(
      (uri: string): MediaItem => ({
        uri,
        type: "image",
      }),
    ),
    ...(service.videos ?? []).map(
      (uri: string): MediaItem => ({
        uri,
        type: "video",
      }),
    ),
  ];

  return (
    <>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        className="p-4"
        showsVerticalScrollIndicator={false}
      >
        {/* Media Grid */}
        {allMedia.length > 0 && (
          <View className="flex-row flex-wrap justify-between mb-6">
            {allMedia.map((item, index) => (
              <View
                key={index}
                className={`${
                  allMedia.length === 1 ? "w-full" : "w-[48%]"
                } h-36 rounded-xl overflow-hidden border border-[#2D2C35] relative mb-3`}
              >
                {item.type === "image" ? (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => setFullscreenMedia(item)}
                    className="w-full h-full"
                  >
                    <Image
                      source={{ uri: item.uri }}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    className="w-full h-full"
                    onPress={() =>
                      setPlayingUri(playingUri === item.uri ? null : item.uri)
                    }
                  >
                    <Video
                      source={{ uri: item.uri }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                      muted
                      paused={playingUri !== item.uri}
                      repeat
                    />

                    {playingUri !== item.uri && (
                      <View className="absolute inset-0 bg-black/40 justify-center items-center">
                        <View className="w-10 h-10 bg-white rounded-full justify-center items-center">
                          <View
                            style={{
                              width: 0,
                              height: 0,
                              borderLeftWidth: 12,
                              borderLeftColor: "#000",
                              borderTopWidth: 7,
                              borderTopColor: "transparent",
                              borderBottomWidth: 7,
                              borderBottomColor: "transparent",
                              marginLeft: 2,
                            }}
                          />
                        </View>
                      </View>
                    )}

                    <TouchableOpacity
                      className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded"
                      onPress={() => setFullscreenMedia(item)}
                    >
                      <Text className="text-white text-xs">Full</Text>
                    </TouchableOpacity>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Service Type */}
        <View className="mb-6">
          <View className="flex-row items-center mb-3">
            <MaterialCommunityIcons
              name="tag-outline"
              size={20}
              color="#9CA3AF"
            />
            <Text className="text-gray-300 text-base font-medium ml-2">
              Service Type
            </Text>
          </View>

          <View className="flex-row flex-wrap gap-y-2">
            {serviceTypes.map((type: string, index: number) => (
              <View
                key={index}
                className="bg-[#3D3528] px-5 py-2 rounded-full mr-3 border border-[#5C4E38]"
              >
                <Text className="text-[#C5A059] text-sm font-semibold">
                  {type}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Service Notes */}
        <View className="mb-6">
          <View className="flex-row items-center mb-2">
            <MaterialIcons name="assignment" size={18} color="#4B5563" />
            <Text className="text-gray-500 text-base ml-2">Service Notes</Text>
          </View>

          <View className="bg-[#101012] p-4 rounded-xl border border-[#4F4F59] min-h-[55px] justify-center">
            <Text className="text-white text-[15px]">
              {service.serviceNotes || "—"}
            </Text>
          </View>
        </View>

        {/* Personal Notes */}
        <View className="mb-6">
          <View className="flex-row items-center mb-2">
            <Ionicons name="person-outline" size={18} color="#4B5563" />
            <Text className="text-gray-500 text-base ml-2">Personal Notes</Text>
          </View>

          <View className="bg-[#101012] p-4 rounded-xl border border-[#4F4F59] min-h-[55px] justify-center">
            <Text className="text-white text-[15px]">
              {service.personalNotes || "—"}
            </Text>
          </View>
        </View>

        {/* Duration */}
        <View className="mb-6">
          <View className="flex-row items-center mb-2">
            <Ionicons name="time-outline" size={18} color="#4B5563" />
            <Text className="text-gray-500 text-base ml-2">Duration</Text>
          </View>

          <View className="bg-[#101012] p-4 rounded-xl border border-[#4F4F59] min-h-[55px] justify-center">
            <Text className="text-gray-400 text-[15px]">
              {service.duration ? `${service.duration} min` : "—"}
            </Text>
          </View>
        </View>

        {/* Pricing */}
        <View className="flex-row justify-between">
          <View className="w-[47%]">
            <Text className="text-gray-500 text-base mb-2">Service Price</Text>

            <View className="bg-[#101012] p-4 rounded-xl border border-[#4F4F59] min-h-[55px] justify-center">
              <Text className="text-gray-400 text-[15px]">
                ${service.servicePrice}
              </Text>
            </View>
          </View>

          <View className="w-[47%]">
            <Text className="text-gray-500 text-base mb-2">Tip</Text>

            <View className="bg-[#101012] p-4 rounded-xl border border-[#4F4F59] min-h-[55px] justify-center">
              <Text className="text-gray-400 text-[15px]">${service.tips}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fullscreen Media */}
      {fullscreenMedia && (
        <Modal visible animationType="fade">
          <View style={{ flex: 1, backgroundColor: "black" }}>
            {fullscreenMedia.type === "image" ? (
              <Image
                source={{ uri: fullscreenMedia.uri }}
                style={{ width, height }}
                resizeMode="contain"
              />
            ) : (
              <Video
                source={{ uri: fullscreenMedia.uri }}
                style={{ width, height }}
                resizeMode="contain"
                controls
                repeat
              />
            )}

            <TouchableOpacity
              onPress={() => setFullscreenMedia(null)}
              className="absolute top-12 right-6 bg-black/60 px-4 py-2 rounded-lg"
            >
              <Text className="text-white text-base">Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}

      {/* Footer */}
      <View className="absolute bottom-0 left-0 right-0 flex-row justify-between items-center px-6 py-8 bg-[#0F0E17] border-t border-[#4F4F59]">
        <Text className="text-gray-600 text-xl">Total</Text>
        <Text className="text-white text-2xl font-bold">${total}</Text>
      </View>
    </>
  );
};

export default ServiceDetails;
