import { useState, useCallback } from "react";
import { useChangePasswordFromSettingsMutation } from "@/services/api/settingsApi";

const useChangePasswordFromSettings = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [changePasswordApi, { isLoading }] =
    useChangePasswordFromSettingsMutation();

  const clearMessages = useCallback(() => {
    setTimeout(() => {
      setError(null);
      setSuccessMessage(null);
    }, 3500);
  }, []);

  const handleChangePassword = useCallback(async () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError("Please fill all fields");
      clearMessages();
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      clearMessages();
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      clearMessages();
      return;
    }

    try {
      const response = await changePasswordApi({
        oldPassword,
        newPassword,
        confirmPassword,
      }).unwrap();

      setSuccessMessage(response?.message || "Password changed successfully");

      // Optional: reset fields after success
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err: any) {
      console.error(err);

      setError(
        err?.data?.message || err?.message || "Failed to change password",
      );
    } finally {
      clearMessages();
    }
  }, [
    oldPassword,
    newPassword,
    confirmPassword,
    changePasswordApi,
    clearMessages,
  ]);

  return {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    loading: isLoading,
    error,
    successMessage,
    handleChangePassword,
  };
};

export default useChangePasswordFromSettings;
