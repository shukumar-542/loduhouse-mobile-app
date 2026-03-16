import { Stack } from "expo-router";
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#fff" },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="otpVerification" />
      <Stack.Screen name="emailConfirmation" />
      <Stack.Screen name="passwordOtpVerification" />
      <Stack.Screen name="changePassword" />
      <Stack.Screen name="chooseRole" />
    </Stack>
  );
}
