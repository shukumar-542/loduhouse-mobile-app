import { useState } from "react";
import { useResetPasswordMutation } from "@/services/api/authApi";

const useChangePassword = (email: string, otp: string) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [changePasswordApi, { isLoading }] = useResetPasswordMutation();

  const clearMessages = () => {
    setTimeout(() => {
      setError(null);
      setSuccessMessage(null);
    }, 3500);
  };

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError("Please fill all fields");
      clearMessages();
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      clearMessages();
      return;
    }

    try {
      const response = await changePasswordApi({
        email,
        otp,
        newPassword,
        confirmPassword,
      }).unwrap();

      setSuccessMessage(response?.message || "Password changed successfully");
    } catch (err: any) {
      console.log(err);
      setError(
        err?.data?.message || err?.message || "Failed to change password",
      );
    } finally {
      clearMessages();
    }
  };

  return {
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

export default useChangePassword;
