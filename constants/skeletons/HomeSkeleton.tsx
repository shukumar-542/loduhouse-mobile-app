import React from "react";
import { ScrollView, View } from "react-native";
import Skeleton from "./Skeleton";

const Row = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) => (
  <View style={[{ flexDirection: "row", alignItems: "center" }, style]}>
    {children}
  </View>
);

const Spacer = ({ h = 0, w = 0 }: { h?: number; w?: number }) => (
  <View style={{ height: h, width: w }} />
);

const StatCardSkeleton = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: "#1A1628",
      borderRadius: 16,
      padding: 16,
      minHeight: 96,
    }}
  >
    <Skeleton width={60} height={10} borderRadius={5} />
    <Spacer h={10} />
    <Skeleton width={80} height={22} borderRadius={6} />
    <Spacer h={8} />
    <Skeleton width={50} height={10} borderRadius={5} />
  </View>
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

const HomeSkeleton = () => (
  <ScrollView
    contentContainerStyle={{
      paddingHorizontal: 24,
      paddingTop: 24,
      paddingBottom: 100,
    }}
    showsVerticalScrollIndicator={false}
  >
    <Row style={{ justifyContent: "space-between", marginBottom: 24 }}>
      <Skeleton width={120} height={26} borderRadius={8} />
      <Skeleton width={48} height={48} borderRadius={24} />
    </Row>

    <Row style={{ marginBottom: 24, gap: 12 }}>
      <Skeleton width="80%" height={64} borderRadius={32} />
      <Skeleton width={64} height={64} borderRadius={32} />
    </Row>

    <Row style={{ gap: 12, marginBottom: 28 }}>
      <StatCardSkeleton />
      <StatCardSkeleton />
    </Row>

    <Row style={{ justifyContent: "space-between", marginBottom: 16 }}>
      <Skeleton width={120} height={20} borderRadius={6} />

      <Skeleton width={80} height={16} borderRadius={6} />
    </Row>

    {Array.from({ length: 5 }).map((_, idx) => (
      <UserCardSkeleton key={idx} />
    ))}
  </ScrollView>
);

export default HomeSkeleton;
