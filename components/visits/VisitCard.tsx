import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";

interface VisitCardProps {
  id: string;
  date: string;
  title: string;
  formula: string;
  media: ImageSourcePropType[];
}

const VisitCard: React.FC<VisitCardProps> = ({
  id,
  date,
  title,
  formula,
  media,
}) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(
      `/client/visitDetails?id=${id}&date=${encodeURIComponent(date)}`,
    );
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleNavigate}
      style={{
        backgroundColor: "#111118",
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#2A2535",
        padding: 16,
        marginBottom: 12,
      }}
    >
      {/* Top Row: date + arrow */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#1E1B2E",
            borderRadius: 20,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderWidth: 1,
            borderColor: "#2E2A45",
          }}
        >
          <Feather
            name="calendar"
            size={11}
            color="#C9A367"
            style={{ marginRight: 5 }}
          />
          <Text style={{ color: "#C9A367", fontSize: 12, fontWeight: "500" }}>
            {date}
          </Text>
        </View>

        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: 16,
            backgroundColor: "#1E1B2E",
            borderWidth: 1,
            borderColor: "#2E2A45",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Feather name="arrow-right" size={15} color="#C9A367" />
        </View>
      </View>

      {/* Title */}
      <Text
        style={{
          color: "#fff",
          fontSize: 17,
          fontWeight: "600",
          marginBottom: 4,
          letterSpacing: 0.2,
        }}
      >
        {title}
      </Text>

      {/* Formula */}
      <Text
        style={{
          color: "#666",
          fontSize: 13,
          marginBottom: media.length > 0 ? 12 : 0,
          lineHeight: 19,
        }}
        numberOfLines={2}
      >
        {formula}
      </Text>

      {/* Media */}
      {media.length > 0 && (
        <View style={{ flexDirection: "row" }}>
          {media.slice(0, 4).map((img, index) => (
            <View key={index} style={{ position: "relative", marginRight: 8 }}>
              <Image
                source={img}
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 10,
                  backgroundColor: "#1a1a1a",
                  borderWidth: 1,
                  borderColor: "#2A2535",
                }}
                resizeMode="cover"
              />
              {/* +N overlay on last visible if more than 4 */}
              {index === 3 && media.length > 4 && (
                <View
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: 56,
                    height: 56,
                    borderRadius: 10,
                    backgroundColor: "rgba(0,0,0,0.6)",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{ color: "#fff", fontWeight: "600", fontSize: 13 }}
                  >
                    +{media.length - 3}
                  </Text>
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default VisitCard;
