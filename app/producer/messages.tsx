import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

type Conversation = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  online: boolean;
  unread?: number;
};

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Mike Johnson",
    avatar: "MJ",
    lastMessage: "Thanks for the update!",
    time: "11:10 AM",
    online: true,
  },
  {
    id: "2",
    name: "Sarah Williams",
    avatar: "SW",
    lastMessage: "Can we reschedule the session?",
    time: "10:30 AM",
    online: false,
    unread: 2,
  },
  {
    id: "3",
    name: "James Lee",
    avatar: "JL",
    lastMessage: "The mix sounds great!",
    time: "Yesterday",
    online: false,
  },
];

export default function Messages() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-zinc-950">
      {/* Header */}
      <View className="px-5 pt-14 pb-4">
        <Text className="text-white text-2xl font-bold">Inbox</Text>
      </View>

      <FlatList
        data={conversations}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => (
          <View className="h-px bg-zinc-800 mx-5" />
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/chat/[userId]",
                params: { userId: item.id, name: item.name, online: item.online ? "true" : "false" },
              })
            }
            className="flex-row items-center px-5 py-4 gap-3"
            activeOpacity={0.7}
          >
            {/* Avatar */}
            <View className="relative">
              <View className="w-12 h-12 rounded-full bg-indigo-600 items-center justify-center">
                <Text className="text-white font-bold text-sm">{item.avatar}</Text>
              </View>
              {item.online && (
                <View className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-zinc-950" />
              )}
            </View>

            {/* Info */}
            <View className="flex-1">
              <Text className="text-white font-semibold text-[15px]">{item.name}</Text>
              <Text className="text-zinc-400 text-sm mt-0.5" numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </View>

            {/* Time + Unread */}
            <View className="items-end gap-1">
              <Text className="text-zinc-500 text-xs">{item.time}</Text>
              {item.unread && (
                <View className="bg-indigo-600 rounded-full w-5 h-5 items-center justify-center">
                  <Text className="text-white text-[10px] font-bold">{item.unread}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}