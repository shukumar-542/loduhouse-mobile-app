import { useState } from "react";
import {
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useVerifyRegistrationMutation,
} from "@/services/api/authApi";

const useOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  // Separate state for sending OTP (forgot password)
  const [sendLoading, setSendLoading] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sendSuccess, setSendSuccess] = useState<string | null>(null);

  // Separate state for verifying OTP
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const [verifySuccess, setVerifySuccess] = useState<string | null>(null);

  const [forgotPassword] = useForgotPasswordMutation();
  const [verifyOtpApi] = useVerifyOtpMutation();
  const [verifyRegistrationApi] = useVerifyRegistrationMutation();

  // Function to send OTP for forgot password
  const sendOtp = async () => {
    if (!email) {
      setSendError("Please enter your email");
      clearSendError();
      return;
    }

    try {
      setSendLoading(true);
      const response = await forgotPassword({ email }).unwrap();
      setSendSuccess(response.data?.message || "OTP sent to your email!");
      clearSendSuccess();
    } catch (err: any) {
      setSendError(err?.data?.message || err?.message || "Failed to send OTP");
      clearSendError();
    } finally {
      setSendLoading(false);
    }
  };

  // Function to verify OTP for forgot password
  const verifyOtp = async () => {
    if (!otp) {
      setVerifyError("Please enter the OTP");
      clearVerifyError();
      return;
    }

    try {
      setVerifyLoading(true);
      const response = await verifyOtpApi({ email, otp }).unwrap();
      setVerifySuccess(response.data?.message || "OTP verified successfully!");
      clearVerifySuccess();
    } catch (err: any) {
      setVerifyError(
        err?.data?.message || err?.message || "Failed to verify OTP",
      );
      clearVerifyError();
    } finally {
      setVerifyLoading(false);
    }
  };

  // Function to verify OTP for registration
  const verifyRegistrationOtp = async () => {
    if (!email) {
      setVerifyError("Please enter your email");
      clearVerifyError();
      return false;
    }

    if (!otp) {
      setVerifyError("Please enter the OTP");
      clearVerifyError();
      return false;
    }

    try {
      setVerifyLoading(true);
      const response = await verifyRegistrationApi({ email, otp }).unwrap();
      (console.log(response),
        setVerifySuccess(
          response.data?.message || "Registration OTP verified successfully!",
        ));
      clearVerifySuccess();
      return true;
    } catch (err: any) {
      console.log(err);
      setVerifyError(
        err?.data?.message ||
          err?.message ||
          "Failed to verify registration OTP",
      );
      clearVerifyError();
      return false;
    } finally {
      setVerifyLoading(false);
    }
  };

  const reset = () => {
    setEmail("");
    setOtp("");
    setSendError(null);
    setSendSuccess(null);
    setVerifyError(null);
    setVerifySuccess(null);
  };

  // Helper functions to auto-clear messages
  const clearSendError = () => setTimeout(() => setSendError(null), 3500);
  const clearSendSuccess = () => setTimeout(() => setSendSuccess(null), 3500);
  const clearVerifyError = () => setTimeout(() => setVerifyError(null), 3500);
  const clearVerifySuccess = () =>
    setTimeout(() => setVerifySuccess(null), 3500);

  return {
    email,
    setEmail,
    otp,
    setOtp,
    sendLoading,
    sendError,
    sendSuccess,
    verifyLoading,
    verifyError,
    verifySuccess,
    sendOtp,
    verifyOtp,
    verifyRegistrationOtp, // <-- new function for registration OTP
    reset,
  };
};

export default useOtp;
