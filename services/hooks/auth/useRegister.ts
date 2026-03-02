import { useState } from "react";
import { useRegisterMutation } from "@/services/api/authApi";

const useRegister = () => {
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const [registerMutation, { isLoading }] = useRegisterMutation();

  const register = async () => {
    // Pre-validation: check all required fields
    if (!fullName.trim()) {
      setError("Full name is required.");
      clearErrorAfterDelay();
      return false;
    }

    if (!mobileNumber.trim()) {
      setError("Mobile number is required.");
      clearErrorAfterDelay();
      return false;
    }

    if (!email.trim()) {
      setError("Email is required.");
      clearErrorAfterDelay();
      return false;
    }

    if (!password.trim()) {
      setError("Password is required.");
      clearErrorAfterDelay();
      return false;
    }

    if (!agreedToTerms) {
      setError("You must agree to the terms and conditions.");
      clearErrorAfterDelay();
      return false;
    }

    // All validation passed — call API
    try {
      setError(null);
      setSuccessMessage(null);

      await registerMutation({
        fullName,
        mobileNumber,
        email,
        password,
      }).unwrap();

      setSuccessMessage(
        "Registration successful! Please verify your phone number.",
      );

      return true;
    } catch (err: any) {
      const errorMessage =
        err?.data?.message || err.message || "An unexpected error occurred";
      setError(errorMessage);
      clearErrorAfterDelay();
      return false;
    }
  };

  const clearErrorAfterDelay = () => {
    setTimeout(() => setError(null), 3500);
  };

  return {
    fullName,
    setFullName,
    mobileNumber,
    setMobileNumber,
    email,
    setEmail,
    password,
    setPassword,
    agreedToTerms,
    setAgreedToTerms,
    loading: isLoading,
    error,
    successMessage,
    register,
  };
};

export default useRegister;
