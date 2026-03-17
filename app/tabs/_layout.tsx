import React, { useEffect } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
} from "react-native-reanimated";
import { colors, gradients } from "@/theme/colors";

const icons: Record<string, string> = {
  home: "people",
  visits: "calendar", 
  analytics: "stats-chart",
  settings: "settings",
};

const AnimatedTabItem = ({ route, isFocused, navigation, label }: any) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(isFocused ? 1 : 0.5);

  useEffect(() => {
    translateY.value = withSpring(isFocused ? -4 : 0, {
      damping: 10,
      stiffness: 200,
    });
    opacity.value = withSpring(isFocused ? 1 : 0.5);
  }, [isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const tintColor = isFocused ? gradients.primary[0] : colors.text.disabled;
  const resolvedIcon = icons[route.name] || "ellipse";
  const finalIcon = isFocused ? resolvedIcon : `${resolvedIcon}-outline`;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(route.name)}
      className="flex-1 items-center justify-center z-10"
      activeOpacity={0.7}
    >
      <Animated.View style={animatedIconStyle}>
        <Ionicons name={finalIcon as any} size={28} color={tintColor} />
      </Animated.View>
      <Text style={{ color: tintColor, fontSize: 10, marginTop: 2 }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }: any) => {
  return (
    <View className="absolute bottom-6 left-5 right-5  flex-row items-center justify-around px-2 py-3">
      {/* Background Layer */}
      <View
        className="absolute inset-0 rounded-3xl"
        style={{
          backgroundColor: "#1a1a1a",
          borderWidth: 1,
          borderColor: "#333",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 8,
        }}
      />

      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const label = options.title || route.name;

        // --- Center Floating Button ---
        // if (route.name === "createClient") {
        //   return (
        //     <View
        //       key={route.key}
        //       className="relative items-center justify-center z-10"
        //     >
        //       <View
        //         className="w-[65px] h-[65px] bg-[#080808] rounded-full items-center justify-center -top-10"
        //         style={{
        //           shadowColor: "#C9A367",
        //           shadowOffset: { width: 10, height: 8 },
        //           shadowOpacity: 0.4,
        //           shadowRadius: 16,
        //           elevation: 6,
        //         }}
        //       >
        //         <TouchableOpacity
        //           onPress={() => navigation.navigate(route.name)}
        //           activeOpacity={0.9}
        //           className="w-[50px] h-[50px] bg-[#C9A367] rounded-full items-center justify-center"
        //           style={{
        //             shadowColor: gradients.primary[0],
        //             shadowOffset: { width: 0, height: 1 },
        //             shadowOpacity: 0.5,
        //             shadowRadius: 12,
        //             elevation: 0,
        //           }}
        //         >
        //           <View className="w-10 h-10 rounded-full border-[2px] border-black/80 items-center justify-center">
        //             <Ionicons name="add" size={26} color="rgba(0,0,0,0.85)" />
        //           </View>
        //         </TouchableOpacity>
        //       </View>
        //     </View>
        //   );
        // }

        // --- Using the Animated Component ---
        return (
          <AnimatedTabItem
            key={route.key}
            route={route}
            isFocused={isFocused}
            navigation={navigation}
            label={label}
          />
        );
      })}
    </View>
  );
};

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { display: "none" },
        animation: "fade",
        sceneStyle: { backgroundColor: "#0F0B18" },
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="home" options={{ title: "Clients" }} />
      <Tabs.Screen name="visits" options={{ title: "Visits" }} />
      <Tabs.Screen name="analytics" options={{ title: "Analytics" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
    </Tabs>
  );
}
