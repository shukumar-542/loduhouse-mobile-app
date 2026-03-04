import { Stack } from "expo-router";
export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#fff" },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="contentPage" />
      <Stack.Screen name="profileSetting" />
      <Stack.Screen name="changePasswordFromSettings" />
    </Stack>
  );
}
