import React, { useState, useRef } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions,
  ScrollView,
  Text,
} from "react-native";
import Video from "react-native-video";

interface MediaItem {
  id: string;
  type: "image" | "video";
  uri: string;
}

interface MediaTabProps {
  media: MediaItem[];
}

const MediaTab: React.FC<MediaTabProps> = ({ media }) => {
  const [playingId, setPlayingId] = useState<string | null>(null); // currently playing video
  const [fullscreenId, setFullscreenId] = useState<string | null>(null);
  if (!media?.length) return null;

  return (
    <ScrollView contentContainerStyle={{ padding: 8 }}>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {media.map((item) => (
          <View
            key={item.id}
            style={{
              width: "48%",
              aspectRatio: 1,
              marginBottom: 8,
              borderRadius: 8,
              overflow: "hidden",
              backgroundColor: "#1f2937",
            }}
          >
            {item.type === "image" ? (
              <Image
                source={{ uri: item.uri }}
                style={{ width: "100%", height: "100%", borderRadius: 8 }}
                resizeMode="cover"
              />
            ) : (
              <VideoCard
                uri={item.uri}
                isPlaying={playingId === item.id}
                onPlay={() => setPlayingId(item.id)}
                onFullscreen={() => setFullscreenId(item.id)}
                onPause={() => setPlayingId(null)}
              />
            )}
          </View>
        ))}
      </View>

      {/* Fullscreen Modal */}
      {fullscreenId && (
        <FullscreenVideo
          uri={media.find((m) => m.id === fullscreenId)?.uri || ""}
          onClose={() => setFullscreenId(null)}
        />
      )}
    </ScrollView>
  );
};

interface VideoCardProps {
  uri: string;
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onFullscreen: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({
  uri,
  isPlaying,
  onPlay,
  onPause,
  onFullscreen,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{ width: "100%", height: "100%", position: "relative" }}
      onPress={() => (isPlaying ? onPause() : onPlay())}
    >
      <Video
        source={{ uri }}
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
        muted
        paused={!isPlaying}
        repeat
        onError={(e) => console.log("Video error:", e)}
      />
      {!isPlaying && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 48,
              height: 48,
              backgroundColor: "#fff",
              borderRadius: 24,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 0,
                height: 0,
                borderLeftWidth: 14,
                borderLeftColor: "#000",
                borderTopWidth: 8,
                borderTopColor: "transparent",
                borderBottomWidth: 8,
                borderBottomColor: "transparent",
              }}
            />
          </View>
        </View>
      )}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 4,
          right: 4,
          backgroundColor: "rgba(0,0,0,0.5)",
          padding: 4,
          borderRadius: 4,
        }}
        onPress={onFullscreen}
      >
        <Text style={{ color: "#fff", fontSize: 12 }}>Full</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const FullscreenVideo: React.FC<{ uri: string; onClose: () => void }> = ({
  uri,
  onClose,
}) => {
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;

  return (
    <Modal visible transparent={false} animationType="slide">
      <View style={{ flex: 1, backgroundColor: "black" }}>
        <Video
          source={{ uri }}
          style={{ width: screenWidth, height: screenHeight }}
          resizeMode="contain"
          repeat
          controls
          onError={(e) => console.log("Fullscreen Video error:", e)}
        />
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 40,
            right: 20,
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: 8,
            borderRadius: 6,
          }}
          onPress={onClose}
        >
          <Text style={{ color: "#fff" }}>Close</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default MediaTab;
