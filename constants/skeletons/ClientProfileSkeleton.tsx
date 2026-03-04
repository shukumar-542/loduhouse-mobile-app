import React, { useEffect, useRef } from "react";
import { View, Animated, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const SkeletonBox = ({
  width: w,
  height: h,
  borderRadius = 8,
  style,
}: {
  width?: number | string;
  height: number;
  borderRadius?: number;
  style?: object;
}) => {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const opacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.65],
  });

  return (
    <Animated.View
      style={[
        {
          width: w,
          height: h,
          borderRadius,
          backgroundColor: "#2a2a35",
          opacity,
        },
        style,
      ]}
    />
  );
};

const ClientProfileSkeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Custom Header */}
      <View style={styles.header}>
        <SkeletonBox width={40} height={40} borderRadius={20} />
        <SkeletonBox width={40} height={40} borderRadius={20} />
      </View>

      {/* Profile Header Card */}
      <View style={styles.profileCard}>
        {/* Avatar + Name Row */}
        <View style={styles.profileRow}>
          <SkeletonBox width={80} height={80} borderRadius={40} />
          <View style={styles.profileInfo}>
            <SkeletonBox width={160} height={22} borderRadius={6} />
            <SkeletonBox
              width={120}
              height={16}
              borderRadius={6}
              style={{ marginTop: 8 }}
            />
          </View>
        </View>

        {/* Note box */}
        <SkeletonBox
          width="100%"
          height={48}
          borderRadius={12}
          style={{ marginTop: 16 }}
        />
      </View>

      {/* Add New Visit Button */}
      <View style={styles.buttonArea}>
        <SkeletonBox width="100%" height={48} borderRadius={24} />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {[80, 60, 60].map((w, i) => (
          <SkeletonBox
            key={i}
            width={w}
            height={18}
            borderRadius={6}
            style={{ marginRight: 24 }}
          />
        ))}
      </View>

      {/* Timeline Cards */}
      <View style={styles.timelineArea}>
        {[1, 2, 3].map((_, i) => (
          <View key={i} style={styles.timelineCard}>
            {/* Date line */}
            <SkeletonBox
              width={90}
              height={13}
              borderRadius={4}
              style={{ marginBottom: 10 }}
            />
            {/* Title */}
            <SkeletonBox
              width={160}
              height={18}
              borderRadius={5}
              style={{ marginBottom: 8 }}
            />
            {/* Formula / tags */}
            <SkeletonBox
              width={220}
              height={14}
              borderRadius={4}
              style={{ marginBottom: 12 }}
            />
            {/* Media thumbnails row */}
            <View style={styles.mediaThumbnails}>
              {[1, 2, 3].map((_, j) => (
                <SkeletonBox
                  key={j}
                  width={72}
                  height={72}
                  borderRadius={8}
                  style={{ marginRight: 8 }}
                />
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0B18",
    paddingTop: 32,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  profileCard: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
    justifyContent: "center",
  },
  buttonArea: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  tabs: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1f1f2e",
  },
  timelineArea: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  timelineCard: {
    backgroundColor: "#101012",
    borderWidth: 1,
    borderColor: "#2a2a35",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  mediaThumbnails: {
    flexDirection: "row",
  },
});

export default ClientProfileSkeleton;
