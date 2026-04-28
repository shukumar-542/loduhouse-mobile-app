import { Stack } from "expo-router";

export default function ProducerProjectLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    />
  );
}