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
import SearchBox from "@/components/shared/SearchBox";
import ShowToast from "@/components/shared/ShowToast";
import UserCard from "@/components/shared/userCard";
import useGetSearchedClients from "@/services/hooks/home/useGetSearchedClients";
import { useGetAllClients } from "@/services/hooks/home/useGetAllClients";
import ClientsSkeleton from "@/constants/skeletons/ClientSkeleton";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
const clients = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const {
    clients,
    isLoading,
    isFetching,
    error,
    loadMore,
    handleRefresh, // already defined in your hook
  } = useGetAllClients();


  useFocusEffect(
    useCallback(() => {
      handleRefresh();
    }, [handleRefresh]),
  );

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
          <View className="mt-4 mb-4">
            <SearchBox
              placeholder="Search clients or Service Types"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitSearch={handleSearchSubmit}
            />
          </View>
        </View>

        <FlatList
          data={clients}
          keyExtractor={(item) => item.id}
          onRefresh={handleRefresh}
          
          refreshing={isFetching}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
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

export default clients;
