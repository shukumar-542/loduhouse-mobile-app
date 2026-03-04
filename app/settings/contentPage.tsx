import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import {
  useGetAboutUsQuery,
  useGetPrivacyPolicyQuery,
  useGetTermsAndConditionsQuery,
} from "@/services/api/settingsApi";

type ContentTag = "about" | "privacy" | "terms";

const ContentPage = () => {
  const router = useRouter();
  const { tag } = useLocalSearchParams<{ tag: ContentTag }>();

  const validTag: ContentTag =
    tag === "privacy" || tag === "terms" ? tag : "about";

  /* ------------------ API Selection ------------------ */

  const { data: aboutData, isLoading: aboutLoading } = useGetAboutUsQuery(
    undefined,
    {
      skip: validTag !== "about",
    },
  );

  const { data: privacyData, isLoading: privacyLoading } =
    useGetPrivacyPolicyQuery(undefined, {
      skip: validTag !== "privacy",
    });

  const { data: termsData, isLoading: termsLoading } =
    useGetTermsAndConditionsQuery(undefined, {
      skip: validTag !== "terms",
    });

  const isLoading = aboutLoading || privacyLoading || termsLoading;

  const response =
    validTag === "about"
      ? aboutData
      : validTag === "privacy"
        ? privacyData
        : termsData;

  const title =
    validTag === "about"
      ? "About Us"
      : validTag === "privacy"
        ? "Privacy Policy"
        : "Terms and Conditions";

  const content = response?.data?.content ?? "";

  return (
    <View style={{ flex: 1, backgroundColor: "#0F0B18" }}>
      <StatusBar barStyle="light-content" backgroundColor="#0F0B18" />

      {/* ── Top Bar ── */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 20,
          paddingTop: 56,
          paddingBottom: 16,
          position: "relative",
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          activeOpacity={0.7}
          style={{
            position: "absolute",
            left: 20,
            top: 56,
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: "#1C1728",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "#E8E0F5",
              fontSize: 22,
              lineHeight: 28,
              marginTop: -2,
            }}
          >
            ‹
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            color: "#E8E0F5",
            fontSize: 20,
            fontWeight: "700",
            letterSpacing: 0.3,
            textAlign: "center",
          }}
        >
          {title}
        </Text>
      </View>

      {/* ── Body ── */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            marginHorizontal: 16,
            marginTop: 12,
            backgroundColor: "#101012",
            borderRadius: 16,
            padding: 20,
          }}
        >
          {isLoading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <Text
              style={{
                color: "#fff",
                fontSize: 14,
                lineHeight: 22,
              }}
            >
              {content}
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ContentPage;
