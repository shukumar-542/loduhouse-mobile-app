import React from "react";
import { ScrollView, View } from "react-native";
import Skeleton from "./Skeleton";

const Spacer = ({ h = 0 }: { h?: number }) => <View style={{ height: h }} />;

const VisitCardSkeleton = () => (
  <View
    style={{
      backgroundColor: "#111118",
      borderRadius: 16,
      borderWidth: 1,
      borderColor: "#2A2535",
      padding: 16,
      marginBottom: 12,
    }}
  >
    {/* Top row: date pill + arrow circle */}
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 8,
      }}
    >
      <Skeleton width={100} height={26} borderRadius={20} />
      <Skeleton width={32} height={32} borderRadius={16} />
    </View>

    {/* Title */}
    <Skeleton width="60%" height={17} borderRadius={6} />
    <Spacer h={6} />

    {/* Formula */}
    <Skeleton width="85%" height={13} borderRadius={4} />
    <Spacer h={4} />
    <Skeleton width="50%" height={13} borderRadius={4} />
    <Spacer h={12} />

    {/* Media thumbnails */}
    <View style={{ flexDirection: "row", gap: 8 }}>
      <Skeleton width={56} height={56} borderRadius={10} />
      <Skeleton width={56} height={56} borderRadius={10} />
      <Skeleton width={56} height={56} borderRadius={10} />
      <Skeleton width={56} height={56} borderRadius={10} />
    </View>
  </View>
);

const VisitsSkeleton = () => (
  <ScrollView
    contentContainerStyle={{
      paddingHorizontal: 20,
      paddingTop: 52,
      paddingBottom: 150,
    }}
    showsVerticalScrollIndicator={false}
  >
    {/* Search box */}
    <View style={{ marginTop: 16, marginBottom: 24 }}>
      <Skeleton width="100%" height={48} borderRadius={32} />
    </View>

    {/* Header row — "All Visits" + total badge */}
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
      }}
    >
      <Skeleton width={80} height={18} borderRadius={6} />
      <Skeleton width={58} height={26} borderRadius={20} />
    </View>

    {/* Cards */}
    {Array.from({ length: 5 }).map((_, i) => (
      <VisitCardSkeleton key={i} />
    ))}
  </ScrollView>
);

export default VisitsSkeleton;
