import "../global.css";
import React, { useEffect, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import SplashScreen from "@/components/initial/Splashscreen";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { useFonts } from "expo-font";
import { Inter_600SemiBold } from "@expo-google-fonts/inter";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as ExpoSplashScreen from "expo-splash-screen";
import * as NavigationBar from "expo-navigation-bar";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { View, Platform } from "react-native";
import { Provider } from "react-redux";
import { store } from "@/store";

ExpoSplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [showSplash, setShowSplash] = useState(true);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);

  const [fontsLoaded, fontError] = useFonts({
    Inter_600SemiBold,
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (fontError) throw fontError;
  }, [fontError]);

  useEffect(() => {
    if (fontsLoaded) ExpoSplashScreen.hideAsync();
  }, [fontsLoaded]);

  useEffect(() => {
    if (Platform.OS === "android") {
      NavigationBar.setButtonStyleAsync("light");
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (fontsLoaded && minTimeElapsed && !showSplash && !hasNavigated) {
      setHasNavigated(true);
      router.replace("/tabs/home");
    }
  }, [fontsLoaded, minTimeElapsed, showSplash, hasNavigated, router]);

  // Splash screen
  if (!fontsLoaded || !minTimeElapsed || showSplash) {
    return (
      <SafeAreaProvider>
        <StatusBar
          style="light"
          translucent={true}
          backgroundColor="transparent"
        />
        <SplashScreen onFinish={() => setShowSplash(false)} />
      </SafeAreaProvider>
    );
  }

  // Main app content with manual insets
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <View
          style={{
            flex: 1,
            paddingTop: insets.top, // manual top inset
            paddingBottom: insets.bottom, // manual bottom inset
            paddingLeft: insets.left, // manual left inset
            paddingRight: insets.right, // manual right inset
            backgroundColor: "#0F0B18",
          }}
        >
          <StatusBar
            style="light"
            translucent={true}
            backgroundColor="transparent"
          />
          <AlertNotificationRoot theme="dark">
            <Stack
              screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: "#0F0B18" },
                animation: "slide_from_right",
              }}
            />
          </AlertNotificationRoot>
        </View>
      </SafeAreaProvider>
    </Provider>
  );
}
