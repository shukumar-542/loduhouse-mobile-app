import React, { useState, useCallback, memo } from "react";
import {
  View,
  KeyboardAvoidingView,
  FlatList,
  Platform,
  ActivityIndicator,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import SvgIcon from "@/components/shared/svgIcon";
import AppLogo from "@/assets/images/SplashIcon.svg";
import ShowToast from "@/components/shared/ShowToast";
import UserCard from "@/components/shared/userCard";
import { useGetAllClients } from "@/services/hooks/home/useGetAllClients";
import ClientsSkeleton from "@/constants/skeletons/ClientSkeleton";
import SearchBox from "@/components/shared/SearchBox";
import type { CleanClient } from "@/services/hooks/home/useGetAllClients";

const ClientRow = memo(
  ({ item, onPress }: { item: CleanClient; onPress: (id: string) => void }) => (
    <UserCard
      name={item.name}
      lastService={item.email}
      imageUri={item.imageUri}
      onPress={() => onPress(item.id)}
    />
  ),
);

const ClientsScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const {
    clients,
    isLoading,
    isFetching,
    error,
    loadMore,
    hasMore,
    refreshing,
    total,
    handleRefresh,
  } = useGetAllClients();

  const handlePress = useCallback(
    (id: string) => {
      router.push({
        pathname: "/client/clientProfile",
        params: { id },
      });
    },
    [router],
  );

  const renderItem = useCallback(
    ({ item }: { item: CleanClient }) => (
      <ClientRow item={item} onPress={handlePress} />
    ),
    [handlePress],
  );

  const keyExtractor = useCallback(
    (item: CleanClient, index: number) => item.id ?? index.toString(),
    [],
  );

  if (isLoading) return <ClientsSkeleton />;

  return (
    <View className="flex-1 bg-[#0F0B18]">
      <ShowToast
        message={error ? "Failed to load clients" : ""}
        type={error ? "error" : "info"}
      />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <FlatList
          data={clients}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          onEndReached={() => {
            if (hasMore) loadMore();
          }}
          onEndReachedThreshold={0.5}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          removeClippedSubviews={true}
          maxToRenderPerBatch={8}
          windowSize={10}
          initialNumToRender={8}
          ListHeaderComponent={
            <View>
              <View className="flex-row justify-between items-center pt-4 pb-2">
                <SvgIcon SvgComponent={AppLogo} />
              </View>

              {/* ✅ Search with suggestions */}
              <View style={{ zIndex: 999, marginTop: 12, marginBottom: 8 }}>
                <SearchBox
                  placeholder="Search clients by name..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  mode="clients"
                />
              </View>

              <View className="flex-row justify-between items-center mt-4 mb-3">
                <Text className="text-white text-lg font-semibold">
                  All Clients
                </Text>
                <View className="bg-[#1E1B2E] border border-[#2E2A45] rounded-full px-3 py-1.5">
                  <Text className="text-[#C9A367] text-sm font-medium">
                    {total} total
                  </Text>
                </View>
              </View>
            </View>
          }
          ListHeaderComponentStyle={{ zIndex: 999 }}
          ListEmptyComponent={
            !isFetching ? (
              <View style={{ paddingTop: 60, alignItems: "center" }}>
                <Text style={{ color: "#555", fontSize: 14 }}>
                  No clients found
                </Text>
              </View>
            ) : null
          }
          ListFooterComponent={
            isFetching && hasMore ? (
              <View className="py-4">
                <ActivityIndicator size="small" color="#C9A367" />
              </View>
            ) : null
          }
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: 150,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default ClientsScreen;
