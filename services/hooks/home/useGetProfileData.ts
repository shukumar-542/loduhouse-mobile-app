// useGetProfileData.ts
import { useState, useEffect, useCallback } from "react";
import * as SecureStore from "expo-secure-store";

export const useGetProfileData = () => {
  const [profileImage, setProfileImage] = useState(
    require("@/assets/images/Avater.png"), // default fallback
  );
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await SecureStore.getItemAsync("user_data");
      if (data) {
        const parsedData = JSON.parse(data);
        const user = parsedData.user || {};
        setProfileImage(
          user.profilePicture
            ? { uri: user.profilePicture }
            : require("@/assets/images/Avater.png"),
        );
        setFullName(user.fullName || "");
        setEmail(user.email || "");
      } else {
        // No data, reset to defaults
        setProfileImage(require("@/assets/images/Avater.png"));
        setFullName("");
        setEmail("");
      }
    } catch (err) {

    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch once on mount
  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return {
    profileImage,
    fullName,
    email,
    isLoading,
    refetch: fetchUserData, // expose refetch
  };
};
