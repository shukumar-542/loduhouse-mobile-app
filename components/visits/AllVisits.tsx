import React from "react";
import { View, Text } from "react-native";
import VisitCard from "./VisitCard";

export interface VisitItem {
  id: string;
  date: string;
  name: string;
  items: string[];
  media: string[];
}

interface AllVisitsProps {
  timeline: VisitItem[];
  total?: number;
}

const AllVisits: React.FC<AllVisitsProps> = ({ timeline, total }) => {
  return (
    <View style={{ paddingBottom: 40 }}>
      {/* Header Row */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 16,
            fontWeight: "600",
            letterSpacing: 0.3,
          }}
        >
          All Visits
        </Text>
        <View
          style={{
            backgroundColor: "#1E1B2E",
            borderRadius: 20,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderWidth: 1,
            borderColor: "#2E2A45",
          }}
        >
          <Text style={{ color: "#C9A367", fontSize: 12, fontWeight: "500" }}>
            {total ?? timeline.length} total
          </Text>
        </View>
      </View>

      {/* Cards */}
      {timeline.map((visit) => (
        <VisitCard
          key={visit.id}
          id={visit.id}
          date={visit.date}
          title={visit.name}
          formula={visit.items?.join(" + ") ?? ""}
          media={visit.media?.map((uri) => ({ uri })) ?? []}
        />
      ))}
    </View>
  );
};

export default AllVisits;
