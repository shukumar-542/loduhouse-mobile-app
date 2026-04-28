import { View, Text, TouchableOpacity } from "react-native";
import { Calendar, Clock, User } from "lucide-react-native";
import { router } from "expo-router";

const SessionCard = ({ item }: any) => {
  const getStatusStyle = () => {
    switch (item.status) {
      case "confirmed":
        return {
          bg: "bg-[#0f2f1f]",
          text: "text-green-400",
          label: "Confirmed",
        };
      case "completed":
        return {
          bg: "bg-[#1e3a8a]",
          text: "text-blue-400",
          label: "Completed",
        };
      default:
        return {
          bg: "bg-gray-700",
          text: "text-gray-300",
          label: item.status,
        };
    }
  };

  const statusStyle = getStatusStyle();

  return (
    <View className="bg-[#111111] border border-gray-800 rounded-2xl p-4 mb-4">

      {/* Header */}
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-white text-lg font-semibold">
            {item.name}
          </Text>
          <Text className="text-gray-400 text-sm">
            {item.service}
          </Text>
        </View>

        {/* Status Badge */}
        <View className={`px-3 py-1 rounded-full ${statusStyle.bg}`}>
          <Text className={`text-sm ${statusStyle.text}`}>
            {statusStyle.label}
          </Text>
        </View>
      </View>

      {/* Engineer */}
      <View className="flex-row items-center gap-2 mt-3">
        <User size={16} color="#9CA3AF" />
        <Text className="text-gray-400 text-sm">
          {item.engineer}
        </Text>
      </View>

      {/* Date */}
      <View className="flex-row items-center gap-2 mt-2">
        <Calendar size={16} color="#9CA3AF" />
        <Text className="text-gray-400 text-sm">
          {item.date}
        </Text>
      </View>

      {/* Time */}
      <View className="flex-row items-center gap-2 mt-2">
        <Clock size={16} color="#9CA3AF" />
        <Text className="text-gray-400 text-sm">
          {item.time}
        </Text>
      </View>

      {/* Divider */}
      <View className="h-[1px] bg-gray-800 my-4" />

      {/* View Details */}
      <TouchableOpacity onPress={()=> router.push("/producerProject/projectDetails")}>
        <Text className="text-[#5B2EFF] text-sm font-medium">
          View Details
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SessionCard;