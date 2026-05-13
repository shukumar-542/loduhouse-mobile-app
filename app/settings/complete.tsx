import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { CheckCircle, House } from "lucide-react-native";

export default function Complete() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-black items-center justify-center px-8">
      {/* Icon */}
      <View className="w-24 h-24 rounded-full bg-indigo-600/20 items-center justify-center mb-8"
        style={{
          shadowColor: "#5B2EFF",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.8,
          shadowRadius: 30,
          elevation: 20,
        }}
      >
        <CheckCircle color="#5B2EFF" size={48} strokeWidth={1.5} />
      </View>

      {/* Text */}
      <Text className="text-white text-3xl font-bold text-center mb-3">
        Studio Setup{"\n"}Complete! 🎉
      </Text>
      <Text className="text-zinc-400 text-sm text-center leading-5">
        Your studio is now live and ready to{"\n"}receive bookings
      </Text>

      {/* Button */}
      <TouchableOpacity
        onPress={() => router.replace("/producer/profile")}
        className="absolute bottom-12 left-8 right-8 bg-indigo-600 rounded-2xl py-4 flex-row items-center justify-center gap-2"
      >
        <Text className="text-xl"><House color={"white"}/></Text>
        <Text className="text-white font-semibold text-[15px]">
          Go to Dashboard
        </Text>
      </TouchableOpacity>
    </View>
  );
}