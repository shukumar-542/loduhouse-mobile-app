import {
  View,
  FlatList,
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useState, useCallback, memo } from "react";
import SearchBox from "@/components/shared/SearchBox";
import VisitCard from "@/components/visits/VisitCard";
import { useGetAllVisits } from "@/services/hooks/visits/useGetAllVisits";
import VisitsSkeleton from "@/constants/skeletons/VisitSkeleton";
import type { VisitItem } from "@/components/visits/AllVisits";
import { View as RNView, Text } from "react-native";

// ─── Memoized row ─────────────────────────────────────────────────
const VisitRow = memo(({ item }: { item: VisitItem }) => (
  <VisitCard
    id={item.id}
    date={item.date}
    title={item.name}
    formula={item.items?.join(" + ") ?? ""}
    media={item.media?.map((uri) => ({ uri })) ?? []}
  />
));

export default function Visits() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    visits,
    isLoading,
    isFetching,
    hasMore,
    total,
    refreshing,
    loadMore,
    handleRefresh,
  } = useGetAllVisits();

  const filteredTimeline = visits.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.items.some((s) =>
        s.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  const renderItem = useCallback(
    ({ item }: { item: VisitItem }) => <VisitRow item={item} />,
    [],
  );

  const keyExtractor = useCallback((item: VisitItem) => item.id, []);

  if (isLoading) return <VisitsSkeleton />;

  return (
    <View style={{ flex: 1, backgroundColor: "#0D0A15" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <FlatList
          data={filteredTimeline}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReached={() => {
            if (hasMore) loadMore();
          }}
          onEndReachedThreshold={0.5}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          removeClippedSubviews={true}
          maxToRenderPerBatch={8}
          windowSize={10}
          initialNumToRender={6}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingTop: 52,
            paddingBottom: 150,
          }}
          ListHeaderComponent={
            <View>
              {/* Search */}
              <View className="mt-2 flex-row items-center mb-6">
                <View className="flex-1">
                  <SearchBox
                    placeholder="Search visits by services..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    mode="visits" // ✅
                  />
                </View>
              </View>
              {/* Title + total */}
              <View className="flex-row justify-between items-center mt-4 mb-3">
                <Text className="text-white text-lg font-semibold">
                  All Visits
                </Text>
                <View className="bg-[#1E1B2E] border border-[#2E2A45] rounded-full px-3 py-1.5">
                  <Text className="text-[#C9A367] text-sm font-medium">
                    {total} total
                  </Text>
                </View>
              </View>
            </View>
          }
          ListHeaderComponentStyle={{ marginBottom: 8 }}
          ListEmptyComponent={
            !isFetching ? (
              <RNView style={{ paddingTop: 60, alignItems: "center" }}>
                <Text style={{ color: "#555", fontSize: 14 }}>
                  No visits found
                </Text>
              </RNView>
            ) : null
          }
          ListFooterComponent={
            isFetching && hasMore ? (
              <View style={{ paddingVertical: 16, alignItems: "center" }}>
                <ActivityIndicator size="small" color="#C9A367" />
              </View>
            ) : null
          }
        />
      </KeyboardAvoidingView>
    </View>
  );
}
