/**
 * Skeleton.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * A reusable animated shimmer skeleton primitive.
 *
 * Usage:
 *   <Skeleton width={200} height={20} borderRadius={6} />
 *   <Skeleton width="100%" height={120} borderRadius={12} style={{ marginTop: 8 }} />
 *
 * The shimmer animates automatically; just unmount when real data arrives.
 */

import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient"; 
interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
}

const SHIMMER_DURATION = 1200;
const BASE_COLOR = "#1E1A2E";
const HIGHLIGHT_COLOR = "#2D2845";

const Skeleton: React.FC<SkeletonProps> = ({
  width = "100%",
  height = 16,
  borderRadius = 8,
  style,
}) => {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: SHIMMER_DURATION,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmer]);

  // Translate the gradient across the element width
  const translateX = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [-300, 300],
  });

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: BASE_COLOR,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { transform: [{ translateX }] },
        ]}
      >
        <LinearGradient
          colors={[BASE_COLOR, HIGHLIGHT_COLOR, BASE_COLOR]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </Animated.View>
  );
};

export default Skeleton;