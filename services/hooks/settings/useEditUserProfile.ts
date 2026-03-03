import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useUpdateProfileMutation } from "@/services/api/settingsApi";

const useEditUserProfile = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [updateProfile] = useUpdateProfileMutation();

  // Load existing user data from SecureStore on mount
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await SecureStore.getItemAsync("user_data");
        if (data) {
          const parsed = JSON.parse(data);
          const user = parsed.user || {};
          setName(user.fullName || "");
          setPhone(user.mobileNumber || "");
          setEmail(user.email || "");
          setLocation(user.location || "");
          setAvatarUri(user.profilePicture || null);
        }
      } catch (err) {
        console.error("Failed to load user data for editing", err);
      }
    };
    loadUserData();
  }, []);

  const saveProfile = async () => {
    setError(null);
    setSuccessMessage(null);
    setLoading(true);

    try {
      const requestData: any = {};

      if (name) requestData.fullName = name;
      if (phone) requestData.mobileNumber = phone;
      if (location) requestData.location = location;

      // Only send profile picture if it's a new local file (not a remote URL)
      if (avatarUri && !avatarUri.startsWith("http")) {
        const fileName = avatarUri.split("/").pop() || "profile.jpg";
        const fileType = fileName.endsWith(".png") ? "image/png" : "image/jpeg";
        requestData.profilePicture = {
          uri: avatarUri,
          name: fileName,
          type: fileType,
        };
      }
console.log(requestData)
      const response = await updateProfile(requestData).unwrap();

      // Update SecureStore with the new data (including URL from server)
      const currentData = await SecureStore.getItemAsync("user_data");
      const parsed = currentData ? JSON.parse(currentData) : { user: {} };
      parsed.user = {
        ...parsed.user,
        fullName: response.fullName || name,
        mobileNumber: response.mobileNumber || phone,
        location: response.location || location,
        profilePicture: response.profilePicture || avatarUri,
        email: parsed.user.email || email, // email not changed by API
      };
      await SecureStore.setItemAsync("user_data", JSON.stringify(parsed));

      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => {
        setSuccessMessage(null);
        setTimeout(() => {
          router.back();
        }, 700);
      }, 1000);
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || err.message || "An unexpected error occurred";
      setError(errorMessage);
      setTimeout(() => {
        setError(null);
      }, 1000);
    } finally {
      setLoading(false);
    }
  };

  return {
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    location,
    setLocation,
    avatarUri,
    setAvatarUri,
    loading,
    error,
    successMessage,
    saveProfile,
  };
};

export default useEditUserProfile;
