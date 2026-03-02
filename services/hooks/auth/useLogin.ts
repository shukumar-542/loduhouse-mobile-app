import { useState, useRef } from "react";
import * as SecureStore from "expo-secure-store";
import { useLoginMutation } from "@/services/api/authApi";

interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
  };
}

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [loginMutation] = useLoginMutation();

  // Keep a reference to the timeout to clear it if needed
  const errorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const successTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const login = async () => {
    setLoading(true);
    if (errorTimeoutRef.current) clearTimeout(errorTimeoutRef.current);
    if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    setError(null);
    setSuccessMessage(null);

    if (!email.trim() || !password.trim()) {
      setError("Please fill in all required fields");
      errorTimeoutRef.current = setTimeout(() => setError(null), 3500);
      setLoading(false);
      return;
    }

    try {
      const result = (await loginMutation({
        email,
        password,
      }).unwrap()) as LoginResponse & { data: { user: any } }; 
      await SecureStore.setItemAsync("user_data", JSON.stringify(result.data));
      const s = await SecureStore.getItemAsync("user_data");
      setSuccessMessage("Login successful!");
      successTimeoutRef.current = setTimeout(
        () => setSuccessMessage(null),
        3500,
      );
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || err.message || "An unexpected error occurred";
      setError(errorMessage);
      errorTimeoutRef.current = setTimeout(() => setError(null), 3500);
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    loading,
    error,
    successMessage,
    login,
  };
};

export default useLogin;
