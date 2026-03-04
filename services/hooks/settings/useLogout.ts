import { useState, useRef } from "react";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";
import { useLogoutMutation } from "@/services/api/settingsApi";
interface LogoutResponse {
  success: boolean;
  message: string;
}

const useLogout = () => {
  const router = useRouter();
  const [logoutMutation] = useLogoutMutation();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const successTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const logout = async () => {
    setLoading(true);
    if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    setError(null);
    setSuccessMessage(null);

    try {
      const result = (await logoutMutation().unwrap()) as LogoutResponse;

      // Clear local storage
      await SecureStore.deleteItemAsync("user_data");

      setSuccessMessage(result?.message || "Logged out successfully");
      successTimeoutRef.current = setTimeout(
        () => setSuccessMessage(null),
        3500,
      );

      // Redirect to login
      router.replace("/auth/login");
    } catch (err: any) {
      const errorMessage = err?.data?.message || err.message || "Logout failed";
      setError(errorMessage);
      errorTimeoutRef.current = setTimeout(() => setError(null), 3500);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    successMessage,
    logout,
  };
};

export default useLogout;
