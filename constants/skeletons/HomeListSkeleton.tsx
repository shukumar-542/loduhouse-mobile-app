import React from "react";
import { View } from "react-native";
import Skeleton from "./Skeleton";

const Spacer = ({ h = 0 }: { h?: number }) => <View style={{ height: h }} />;

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

const HomeListSkeleton = () => (
  <View style={{ paddingHorizontal: 24, paddingTop: 8 }}>
    {Array.from({ length: 5 }).map((_, idx) => (
      <UserCardSkeleton key={idx} />
    ))}
  </View>
);

export default HomeListSkeleton;
