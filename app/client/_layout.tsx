import { Stack } from "expo-router";
export default function ClientLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#0F0B18" },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="clientProfile" />
      <Stack.Screen name="visitDetails" />
      <Stack.Screen name="editProfile" />
      <Stack.Screen name="addNewVisit" />
      <Stack.Screen name="clients" />
    </Stack>
  );
}
