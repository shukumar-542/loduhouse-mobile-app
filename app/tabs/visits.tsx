import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import SearchBox from "@/components/shared/SearchBox";
import AllVisits, { VisitItem } from "@/components/visits/AllVisits";

const DUMMY_TIMELINE: VisitItem[] = [
  {
    id: "1",
    date: "Mar 01, 2025",
    name: "Sarah Johnson",
    items: ["Balayage", "Toner", "Deep Condition"],
    media: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
    ],
  },
  {
    id: "2",
    date: "Feb 20, 2025",
    name: "Emily Carter",
    items: ["Full Highlights", "Gloss"],
    media: [
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400",
    ],
  },
  {
    id: "3",
    date: "Feb 10, 2025",
    name: "Mia Thompson",
    items: ["Root Touch-Up", "Blow Dry", "Keratin Treatment"],
    media: [],
  },
  {
    id: "4",
    date: "Jan 28, 2025",
    name: "Jessica Lee",
    items: ["Color Correction", "Trim"],
    media: [
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400",
      "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400",
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400",
      "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400",
    ],
  },
  {
    id: "5",
    date: "Jan 15, 2025",
    name: "Olivia Brown",
    items: ["Ombre", "Toner", "Trim"],
    media: [],
  },
];

export default function Visits() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = () => {
    console.log("Search submitted:", searchQuery);
  };

  const filteredTimeline = DUMMY_TIMELINE.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.items.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#0D0A15" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              flex: 1,
              paddingHorizontal: 20,
              paddingTop: 52,
              paddingBottom: 32,
            }}
          >
            <View className="mt-4 flex-row items-center">
              <View className="flex-1">
                <SearchBox
                  placeholder="Search visits or services..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  onSubmitSearch={handleSearchSubmit}
                />
              </View>
            </View>

            <View className="mt-6">
              <AllVisits timeline={filteredTimeline} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
