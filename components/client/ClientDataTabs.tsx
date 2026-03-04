import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import TimelineTab from "./TimelineTab";
import MediaTab from "./MediaTab";
import NotesTab from "./NotesTab";
interface ClientDataTabsProps {
  client: any;
}

const ClientDataTabs: React.FC<ClientDataTabsProps> = ({ client }) => {
  const [activeTab, setActiveTab] = useState<"Timeline" | "Media" | "Notes">(
    "Timeline",
  );

  return (
    <View className="flex-1 bg-[#0D0B14]">
      <View className="flex-row px-4 border-b border-gray-800">
        {["Timeline", "Media", "Notes"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab as any)}
            className={`py-3 mr-6 ${
              activeTab === tab ? "border-b-2 border-[#C9A367]" : ""
            }`}
          >
            <Text
              className={`text-base ${
                activeTab === tab ? "text-[#C9A367] font-bold" : "text-gray-500"
              }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView className="flex-1 p-4">
        {activeTab === "Timeline" && <TimelineTab timeline={client.timeline} />}
        {activeTab === "Media" && <MediaTab media={client.media} />}
        {activeTab === "Notes" && <NotesTab notes={client.notes} />}
      </ScrollView>
    </View>
  );
};

export default ClientDataTabs;
