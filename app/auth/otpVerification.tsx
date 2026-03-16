import React, { useRef, useEffect } from "react";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { Button } from "@/components/shared/Button";
import { GeneralText } from "@/components/shared/GeneralText";
import OTPInput, { OTPInputHandle } from "@/components/shared/OtpInput";
import ResendCode from "@/components/shared/ResentCode";
import ShowToast from "@/components/shared/ShowToast";

import useOtp from "../../services/hooks/auth/useOtp";

const OtpVerification = () => {
  const otpRef = useRef<OTPInputHandle>(null);
  const params = useLocalSearchParams();
  const router = useRouter();

  const {
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
    verifyRegistrationOtp, // <-- use registration verification
  } = useOtp();

  useEffect(() => {
    if (params.email && typeof params.email === "string") {
      setEmail(params.email);
    }
  }, [params.email, setEmail]);

  useEffect(() => {
    if (verifySuccess) {
      router.replace("/auth/login");
    }
  }, [verifySuccess, router]);

  const handleSendOtp = async () => {
    await sendOtp();
    otpRef.current?.reset();
  };

  const handleVerifyOtp = async () => {
    // await verifyRegistrationOtp(); // <-- call registration OTP verification
    router.push("/auth/chooseRole");
  };

  return (
    <View className="flex-1 bg-[#0F0B18]">
      <KeyboardAvoidingView className="flex-1" behavior="padding">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 pt-8 pb-6 justify-center">
            <GeneralText
              title="OTP Verification"
              description={`Enter the 6-digit code that you received on ${email || "your email"}`}
            />

            <ShowToast
              message={sendError || sendSuccess || verifyError || verifySuccess}
              type={
                sendError || verifyError
                  ? "error"
                  : sendSuccess || verifySuccess
                    ? "success"
                    : "info"
              }
            />

            <View className="items-center py-2">
              <OTPInput
                ref={otpRef}
                length={6}
                onComplete={setOtp}
                onChange={(digits) => setOtp(digits.join(""))}
              />
            </View>

            <View className="items-center">
              <ResendCode
                isVisible
                timerSeconds={30}
                onResend={handleSendOtp}
              />
            </View>

            <Button
              label={verifyLoading ? "Verifying..." : "Verify OTP"}
              onPress={handleVerifyOtp}
              disabled={otp.length !== 6 || verifyLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default OtpVerification;
