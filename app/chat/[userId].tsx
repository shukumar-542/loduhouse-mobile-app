import {
  View, Text, FlatList, TextInput,
  TouchableOpacity, KeyboardAvoidingView, Platform,
} from "react-native";
import { useState, useRef } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Send, Paperclip, ArrowLeft } from "lucide-react-native";

type Message = {
  id: string;
  text: string;
  sender: "me" | "them";
  time: string;
};

const initialMessages: Message[] = [
  { id: "1", text: "Hey, how is the mixing coming along?", sender: "them", time: "10:30" },
  { id: "2", text: "Going well! Should have the final mix ready by tomorrow.", sender: "me", time: "10:35" },
  { id: "3", text: "Thanks for the update!", sender: "them", time: "10:40" },
];

export default function ChatScreen() {
  const router = useRouter();
  const { name, online } = useLocalSearchParams<{ name: string; online: string }>();
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList>(null);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput("");
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-zinc-950"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={0}
    >
      {/* Header */}
      <View className="flex-row items-center px-4 pt-14 pb-4 gap-3 border-b border-zinc-800">
        <TouchableOpacity onPress={() => router.back()}>
          <Text className="bg-[#111111] p-2 rounded-full text-xl mr-1"><ArrowLeft color={"white"}  /></Text>
        </TouchableOpacity>

        <View className="relative">
          <View className="w-12 h-12 rounded-xl bg-indigo-600 items-center justify-center">
            <Text className="text-white font-bold text-sm">
              {name?.split(" ").map((n) => n[0]).join("")}
            </Text>
          </View>
          {online === "true" && (
            <View className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-zinc-950" />
          )}
        </View>

        <View>
          <Text className="text-white font-semibold text-[16px]">{name}</Text>
          {online === "true" && (
            <Text className="text-green-400 text-sm">● Online</Text>
          )}
        </View>
      </View>

      {/* Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16, gap: 4 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: false })}
        renderItem={({ item, index }) => {
          const isMe = item.sender === "me";
          const showTime =
            index === messages.length - 1 ||
            messages[index + 1]?.sender !== item.sender;

          return (
            <View className={`mb-1 ${isMe ? "items-end" : "items-start"}`}>
              <View
                className={`px-4 py-3 rounded-2xl max-w-[75%] ${
                  isMe ? "bg-indigo-600 rounded-tr-sm" : "bg-zinc-800 rounded-tl-sm"
                }`}
              >
                <Text className="text-white text-sm leading-5">{item.text}</Text>
              </View>
              {showTime && (
                <Text className="text-zinc-500 text-[10px] mt-1 mx-1">{item.time}</Text>
              )}
            </View>
          );
        }}
      />

      {/* Input */}
      <View className="flex-row items-center gap-3 px-4 py-3 border-t border-zinc-800">
        <TouchableOpacity className="w-10 h-10 rounded-full bg-indigo-600/20 items-center justify-center">
          <Paperclip color="#5B2EFF" size={18} />
        </TouchableOpacity>

        <TextInput
          className="flex-1 bg-zinc-900 text-white rounded-2xl px-4 py-3 text-sm"
          placeholder="Type a message..."
          placeholderTextColor="#6b7280"
          value={input}
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />

        <TouchableOpacity
          onPress={sendMessage}
          className="w-10 h-10 rounded-full bg-indigo-600 items-center justify-center"
        >
          <Send color="#ffffff" size={16} />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}