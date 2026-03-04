import React, { useState, useCallback } from "react";
import {
  View,
  KeyboardAvoidingView,
  BackHandler,
  Image,
  Text,
  FlatList,
  Platform,
  TouchableOpacity,
} from "react-native";

import { useNavigation, useFocusEffect, useRouter } from "expo-router";
import SvgIcon from "@/components/shared/svgIcon";
import AppLogo from "@/assets/images/SplashIcon.svg";
import ImageNavigator from "@/components/shared/ImageNavigator";
import { useGetProfileData } from "@/services/hooks/home/useGetProfileData";
import useGetSearchedClients from "@/services/hooks/home/useGetSearchedClients";
import SearchBox from "@/components/shared/SearchBox";
import ShowToast from "@/components/shared/ShowToast";
import StatCard from "@/components/shared/StatCard";
import UserCard from "@/components/shared/userCard";
import { useGetRecentlyViewed } from "@/services/hooks/home/useGetRecentlyViewed";
import ServiceFilter from "@/components/home/ServiceFilter";
import HomeSkeleton from "@/constants/skeletons/HomeSkeleton";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const route = useRouter();

  // ✅ Alias refetch from profile hook
  const { profileImage, refetch: refetchProfile } = useGetProfileData();
  const ProfileImage = profileImage
    ? Image.resolveAssetSource(profileImage)
    : { uri: undefined };

  // ✅ Alias refetch from recently viewed hook
  const {
    recentlyViewed,
    totalClients,
    recentVisits,
    isLoading,
    isFetching,
    error,
    refetch: refetchRecentlyViewed,
  } = useGetRecentlyViewed();

  // ✅ Call both refetches on screen focus
  useFocusEffect(
    useCallback(() => {
      refetchProfile();
      refetchRecentlyViewed();
    }, [refetchProfile, refetchRecentlyViewed]),
  );

  const { clients, successMessage, searchClients } = useGetSearchedClients();

  // Disable hardware back button
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        gestureEnabled: false,
        headerBackVisible: false,
      });
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        () => true,
      );
      return () => subscription.remove();
    }, [navigation]),
  );

  // Handlers
  const handleImagePress = () => route.push("/settings/profileSetting");
  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) return;
    searchClients(searchQuery);
  };

  // Loading state
  if (isLoading) return <HomeSkeleton />;

  return (
    <View className="flex-1 bg-[#0F0B18]">
      {/* Toast */}
      <ShowToast
        message={error ? "Failed to load home data" : (successMessage ?? "")}
        type={error ? "error" : successMessage ? "success" : "info"}
      />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Fixed top section */}
        <View className="px-6 pt-4">
          {/* Header */}
          <View className="flex-row justify-between items-center">
            <SvgIcon SvgComponent={AppLogo} />
            <ImageNavigator
              imageSource={ProfileImage.uri}
              onPress={handleImagePress}
              style={{ borderWidth: 2, borderColor: "#C9A367" }}
            />
          </View>

          {/* Search & Filter */}
          <View className="mt-4 flex-row items-center">
            <View className="flex-1">
              <SearchBox
                placeholder="Search clients "
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitSearch={handleSearchSubmit}
              />
            </View>
  
          </View>

          {/* Stats */}
          <View className="flex-row justify-between items-center mt-9">
            <StatCard label="Total Clients" value={totalClients} />
            <StatCard label="Recent Visits" value={recentVisits} />
          </View>

          {/* Recently Viewed Header */}
          <View className="flex-row justify-between items-end mt-8 mb-4">
            <Text className="text-white text-xl font-bold">
              Recently Viewed
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => route.push("/client/clients")}
            >
              <Text className="text-[#C9A367] text-sm font-medium">
                View Dictionary
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recently Viewed List */}
        {recentlyViewed.length > 0 ? (
          <FlatList
            data={recentlyViewed ?? []}
            keyExtractor={(item, index) =>
              item?.id ? String(item.id) : `recent-${index}`
            }
            renderItem={({ item }) => {
              if (!item) return null;

              return (
                <UserCard
                  name={item.name}
                  lastService={item.lastService}
                  imageUri={item.imageUri}
                  onPress={() =>
                    route.push({
                      pathname: "/client/clientProfile",
                      params: { id: item.id },
                    })
                  }
                />
              );
            }}
            contentContainerStyle={{
              paddingHorizontal: 24,
              paddingBottom: 150,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        ) : (
          <HomeSkeleton />
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Home;
