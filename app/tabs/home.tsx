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
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigation = useNavigation();
  const route = useRouter();

  const { recentlyViewed } = useGetRecentlyViewed();
  const { profileImage, totalClients, recentVisits } = useGetProfileData();
  const ProfileImage = Image.resolveAssetSource(profileImage);

  const { clients, error, successMessage, searchClients } =
    useGetSearchedClients();

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

  const handleImagePress = () => {
    route.push("/tabs/settings");
  };

  const handleSearchSubmit = () => {
    if (!searchQuery.trim()) return;
    searchClients(searchQuery);
  };

  return (
    <View className="flex-1 bg-[#0F0B18]">
      <ShowToast
        message={error || successMessage}
        type={error ? "error" : successMessage ? "success" : "info"}
      />

      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* FIXED TOP SECTION (Non-scrollable) */}
        <View className="px-6 pt-4">
          {/* Header */}
          <View className="flex-row justify-between items-center">
            <SvgIcon SvgComponent={AppLogo} />
            <ImageNavigator
              imageSource={ProfileImage.uri}
              onPress={handleImagePress}
            />
          </View>
          <View className="mt-4 flex-row items-center">
            <View className="flex-1 mr-3">
              <SearchBox
                placeholder="Search clients or Service Types"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitSearch={handleSearchSubmit}
              />
            </View>

            {/* This takes only its own width (h-14 w-14) */}
            <ServiceFilter onSearch={(val) => console.log(val)} />
          </View>
          {/* Stats */}
          <View className="flex-row justify-between items-center mt-9">
            <StatCard label="Total Clients" value={totalClients} />
            <StatCard label="Recent Visits" value={recentVisits} />
          </View>

          {/* List Title */}
          {/* Section Header */}
          <View className="flex-row justify-between items-end mt-8 mb-4">
            <Text className="text-white text-xl font-bold">
              Recently Viewed
            </Text>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => route.push("/tabs/clients")}
            >
              <Text className="text-[#C9A367] text-sm font-medium">
                View Dictionary
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={recentlyViewed}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
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
          )}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom:150,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        />
      </KeyboardAvoidingView>
    </View>
  );
};

export default Home;
