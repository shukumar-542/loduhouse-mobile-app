import AnimatedTabIcon from "@/components/shared/AnimatedTabIcon";
import { Tabs } from "expo-router";
import { Home, Calendar, Folder, CreditCard, User } from "lucide-react-native";



export default function ArtistTabs() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#111111",
          borderRadius: 20,
          height: 74,
          marginHorizontal: 14,
          marginBottom: 8,
          position: "absolute",
          borderWidth: 1,
          borderColor: "#4F4F59",
          paddingTop: 5,
          paddingBottom: 0
        },
        tabBarActiveTintColor: "#7C3AED",
        tabBarInactiveTintColor: "#4F4F59",
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon icon={Home} color={color} size={size} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="bookings"
        options={{
          title: "Bookings",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon icon={Calendar} color={color} size={size} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="projects"
        options={{
          title: "Projects",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon icon={Folder} color={color} size={size} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="payments"
        options={{
          title: "Payments",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon icon={CreditCard} color={color} size={size} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size, focused }) => (
            <AnimatedTabIcon icon={User} color={color} size={size} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}