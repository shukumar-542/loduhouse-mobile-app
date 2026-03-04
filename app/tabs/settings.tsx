import React, { useCallback } from "react";
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useRouter } from "expo-router";
import {
  User,
  Crown,
  Lock,
  Info,
  Database,
  Calendar,
  LogOut,
  ChevronRight,
} from "lucide-react-native";

import { useGetProfileData } from "@/services/hooks/home/useGetProfileData";
import useLogout from "@/services/hooks/settings/useLogout";
import ShowToast from "@/components/shared/ShowToast";

// --- MenuItem Component ---
type MenuItemProps = {
  icon: React.ElementType;
  label: string;
  onPress: () => void;
  badge?: string;
  isLogout?: boolean;
  labelColor?: string;
};

const MenuItem: React.FC<MenuItemProps> = ({
  icon: Icon,
  label,
  onPress,
  badge,
  isLogout,
  labelColor,
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.7}
    style={[styles.menuItem, isLogout && styles.logoutItem]}
  >
    <View style={styles.leftSection}>
      <Icon
        size={20}
        color={isLogout ? "#EF4444" : labelColor || "#E5E7EB"}
        strokeWidth={2}
      />
      <Text
        style={[
          styles.menuLabel,
          { color: labelColor || (isLogout ? "#EF4444" : "#E5E7EB") },
        ]}
      >
        {label}
      </Text>
    </View>

    <View style={styles.rightSection}>
      {badge && (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>{badge}</Text>
        </View>
      )}
      <ChevronRight size={20} color="#6B7280" />
    </View>
  </TouchableOpacity>
);

// --- Main Settings Screen ---
const Settings = () => {
  const router = useRouter();

  // Profile data hook
  const { profileImage, fullName, email, isLoading, refetch } =
    useGetProfileData();

  // Refetch profile data whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  // Logout hook
  const {
    logout,
    loading: isLoggingOut,
    error: logoutError,
    successMessage,
  } = useLogout();

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>

          <View style={styles.avatarContainer}>
            <Image source={profileImage} style={styles.avatarImage} />
            {isLoading && (
              <View style={styles.loadingOverlay}>
                <ActivityIndicator size="small" color="#C9A367" />
              </View>
            )}
          </View>

          <Text style={styles.userName}>{fullName || "User"}</Text>
          <Text style={styles.userEmail}>{email || "user@example.com"}</Text>
        </View>

        {/* Toasts */}
        {logoutError && <ShowToast message={logoutError} type="error" />}
        {successMessage && (
          <ShowToast message={successMessage} type="success" />
        )}

        {/* Menu Items */}
        <View style={styles.menuSection}>
          <MenuItem
            icon={User}
            label="Profile Setting"
            onPress={() => router.push("/settings/profileSetting")}
          />

          <MenuItem
            icon={Crown}
            label="Recall Pro Premium"
            badge="Upgrade"
            labelColor="#C9A367"
            onPress={() => router.push("/subscription/subscriptions")}
          />

          <MenuItem
            icon={Lock}
            label="Change password"
            onPress={() => router.push("/settings/changePasswordFromSettings")}
          />

          <MenuItem
            icon={Info}
            label="About Us"
            onPress={() =>
              router.push({
                pathname: "/settings/contentPage",
                params: { tag: "about" },
              })
            }
          />

          <MenuItem
            icon={Database}
            label="Privacy Policy"
            onPress={() =>
              router.push({
                pathname: "/settings/contentPage",
                params: { tag: "privacy" },
              })
            }
          />

          <MenuItem
            icon={Calendar}
            label="Terms and Conditions"
            onPress={() =>
              router.push({
                pathname: "/settings/contentPage",
                params: { tag: "terms" },
              })
            }
          />

          <View style={{ marginTop: 20 }}>
            <MenuItem
              icon={LogOut}
              label={isLoggingOut ? "Logging Out..." : "Log Out"}
              isLogout
              onPress={logout}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#0B0812" },
  scrollContent: { paddingBottom: 100 },
  header: { alignItems: "center", paddingTop: 20, paddingBottom: 30 },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 30,
  },
  avatarContainer: {
    width: 110,
    height: 110,
    borderRadius: 55,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#312E81",
    marginBottom: 15,
    position: "relative",
  },
  avatarImage: { width: "100%", height: "100%" },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  userName: { color: "#FFFFFF", fontSize: 22, fontWeight: "bold" },
  userEmail: { color: "#9CA3AF", fontSize: 14, marginTop: 4 },
  menuSection: { paddingHorizontal: 20 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#101012",
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#4F4F59",
  },
  logoutItem: { marginTop: 10 },
  leftSection: { flexDirection: "row", alignItems: "center" },
  rightSection: { flexDirection: "row", alignItems: "center" },
  menuLabel: { fontSize: 16, fontWeight: "500", marginLeft: 12 },
  badgeContainer: {
    backgroundColor: "#C9A3671A",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 10,
    borderWidth: 0.5,
    borderColor: "#C9A367",
  },
  badgeText: { color: "#C9A367", fontSize: 12, fontWeight: "600" },
});

export default Settings;
