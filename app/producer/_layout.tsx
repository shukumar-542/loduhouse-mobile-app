import { Tabs } from "expo-router";
import { Calendar, CreditCard, Folder, Home, User } from "lucide-react-native";

export default function ProducerTabs() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: "#0F0B18",
                    borderRadius: 30,
                    height: 70,
                    marginHorizontal: 20,
                    marginBottom: 10,
                    position: "absolute",
                    borderTopWidth: 0,
                    paddingTop: 5
                },
                tabBarActiveTintColor: "#7C3AED",
                tabBarInactiveTintColor: "#6B7280",
            }}
        >
            <Tabs.Screen
                name="dashboard"
                options={{
                    title: "Dashboard",
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="bookings"
                options={{
                    title: "Bookings",
                    tabBarIcon: ({ color, size }) => (
                        <Calendar color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="projects"
                options={{
                    title: "Projects",
                    tabBarIcon: ({ color, size }) => <Folder color={color} size={size} />,
                }}
            />

            <Tabs.Screen
                name="messages"
                options={{
                    title: "Messages",
                    tabBarIcon: ({ color, size }) => (
                        <CreditCard color={color} size={size} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
                }}
            />
        </Tabs>


    )
}