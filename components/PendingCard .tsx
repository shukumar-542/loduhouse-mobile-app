import { View, Text, TouchableOpacity } from "react-native";
import { Calendar, Clock } from "lucide-react-native";

const PendingCard = ({ item, onApprove, onReject }: any) => {
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

        {/* Tag */}
        <View className="px-3 py-1 rounded-full bg-[#2a1a3f]">
          <Text className="text-[#A855F7] text-xs">
            {item.tag}
          </Text>
        </View>
      </View>

      {/* Date & Time */}
      <View className="flex-row justify-between mt-4">

        <View className="flex-row items-center gap-2">
          <Calendar color="#9CA3AF" size={16} />
          <Text className="text-gray-400 text-sm">
            {item.date}
          </Text>
        </View>

        <View className="flex-row items-center gap-2">
          <Clock color="#9CA3AF" size={16} />
          <Text className="text-gray-400 text-sm">
            {item.time}
          </Text>
        </View>

      </View>

      {/* Buttons */}
      <View className="flex-row gap-3 mt-4">
        <TouchableOpacity
          onPress={() => onApprove(item.id)}
          className="flex-1 bg-[#5B2EFF] py-3 rounded-xl items-center"
        >
          <Text className="text-white font-semibold">Approve</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onReject(item.id)}
          className="flex-1 bg-[#3a1515] py-3 rounded-xl items-center"
        >
          <Text className="text-red-400 font-semibold">Reject</Text>
        </TouchableOpacity>
      </View>

      {/* Divider */}
      <View className="h-[1px] bg-gray-800 my-4" />

      {/* View Details */}
      <TouchableOpacity>
        <Text className="text-[#5B2EFF] text-md font-medium">
          View Details
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default PendingCard;