import React from "react";
import { ScrollView, View } from "react-native";
import Skeleton from "./Skeleton";

const Spacer = ({ h = 0, w = 0 }: { h?: number; w?: number }) => (
  <View style={{ height: h, width: w }} />
);

const UserCardSkeleton = () => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#1A1628",
      padding: 12,
      borderRadius: 12,
      marginBottom: 12,
    }}
  >
    <Skeleton width={56} height={56} borderRadius={28} />
    <View style={{ marginLeft: 12, flex: 1 }}>
      <Skeleton width="70%" height={14} borderRadius={6} />
      <Spacer h={6} />
      <Skeleton width="40%" height={12} borderRadius={4} />
    </View>
  </View>
);

const ClientsSkeleton = () => (
  <ScrollView
    contentContainerStyle={{
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 150,
    }}
    showsVerticalScrollIndicator={false}
  >
    {/* Header - logo only (no profile image like home) */}
    <Skeleton
      width={120}
      height={26}
      borderRadius={8}
      style={{ marginBottom: 24 }}
    />

    {/* Search bar */}
    <Skeleton
      width="100%"
      height={52}
      borderRadius={32}
      style={{ marginBottom: 16 }}
    />

    {/* Client list */}
    {Array.from({ length: 8 }).map((_, idx) => (
      <UserCardSkeleton key={idx} />
    ))}
  </ScrollView>
);

export default ClientsSkeleton;
