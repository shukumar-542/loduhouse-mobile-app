import React, { useState } from "react";
import {
  View,
  KeyboardAvoidingView,
  FlatList,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import SvgIcon from "@/components/shared/svgIcon";
import AppLogo from "@/assets/images/SplashIcon.svg";
import ShowToast from "@/components/shared/ShowToast";
import UserCard from "@/components/shared/userCard";
import useGetSearchedClients from "@/services/hooks/home/useGetSearchedClients";
import { useGetAllClients } from "@/services/hooks/home/useGetAllClients";
import ClientsSkeleton from "@/constants/skeletons/ClientSkeleton";

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
    handleRefresh,
  } = useGetAllClients();

  const { successMessage, searchClients } = useGetSearchedClients();

  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) return;
    searchClients(searchQuery);
  };

  if (isLoading) return <ClientsSkeleton />;

  return (
    <View className="flex-1 bg-[#0F0B18]">
      <ShowToast
        message={error ? "Failed to load clients" : (successMessage ?? "")}
        type={error ? "error" : successMessage ? "success" : "info"}
      />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View className="px-6 pt-4">
          <View className="flex-row justify-between items-center">
            <SvgIcon SvgComponent={AppLogo} />
          </View>
        </View>

        <FlatList
          data={clients}
          keyExtractor={(item, index) => item.id ?? index.toString()}
          onEndReached={() => {
            if (hasMore) loadMore();
          }}
          onEndReachedThreshold={0.5}
          onRefresh={handleRefresh} // pull-to-refresh
          refreshing={refreshing} // show spinner on pull
          renderItem={({ item }) => (
            <UserCard
              name={item.name}
              lastService={item.email}
              imageUri={item.imageUri}
              onPress={() =>
                router.push({
                  pathname: "/client/clientProfile",
                  params: { id: item.id },
                })
              }
            />
          )}
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
