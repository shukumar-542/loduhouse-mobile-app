import { useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

export const useGetProfileData = () => {
  const [profileImage, setProfileImage] = useState(
    require("@/assets/images/Avater.png"), // default fallback
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await SecureStore.getItemAsync("user_data");
        if (data) {
          const parsedData = JSON.parse(data);
          if (parsedData.user?.profilePicture) {
            setProfileImage({ uri: parsedData.user.profilePicture });
          }
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  return {
    profileImage,
    totalClients: 3,
    recentVisits: 12,
  };
};
