import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Dimensions, Text } from "react-native";
import { Image } from "react-native";
import SplashIcon from "@/assets/images/appIco.png";

const { width } = Dimensions.get("window");

interface SplashScreenProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    // 1. The Entrance (Fade in + Spring scale)
    const animateIn = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]);

    // 2. The Exit (Fade out + Subtle zoom out)
    const animateOut = Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 800, // Slightly longer fade for a "dreamy" exit
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.05, // Slightly scales up as it disappears
        duration: 800,
        useNativeDriver: true,
      }),
    ]);

    // The Full Story
    Animated.sequence([
      Animated.delay(400),
      animateIn,
      Animated.delay(2000), // How long the user sees the logo
      animateOut,
    ]).start(() => onFinish());
  }, [fadeAnim, scaleAnim, onFinish]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Image
          source={SplashIcon}
          style={{ width: width * 0.7, height: 100, resizeMode: "contain" }}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F0B18",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    justifyContent: "center",
  },
  tagline: {
    marginTop: 20,
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.7,
    fontWeight: "300",
    letterSpacing: 0.5,
  },
});
