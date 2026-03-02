import React, { useEffect, useCallback } from "react";
import { View, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { useRouter } from "expo-router";

import { EmailInput } from "@/components/shared/EmailField";
import { GeneralText } from "@/components/shared/GeneralText";
import { Button } from "@/components/shared/Button";
import ShowToast from "@/components/shared/ShowToast";

import useOtp from "@/services/hooks/auth/useOtp";

const EmailConfirmation = () => {
  const router = useRouter();
  const { email, setEmail, sendLoading, sendError, sendSuccess, sendOtp } =
    useOtp();

  // Send OTP handler
  const confirmEmail = useCallback(async () => {
    if (!email.trim()) return;
    await sendOtp();
  }, [email, sendOtp]);

  // Navigate to OTP screen when OTP is sent successfully
  useEffect(() => {
    if (sendSuccess) {
      router.push({
        pathname: "/auth/passwordOtpVerification",
        params: { email },
      });
    }
  }, [sendSuccess, router, email]);

  const isButtonDisabled = !email.trim() || sendLoading;

  return (
    <View className="flex-1 bg-[#0F0B18]">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 pt-8 pb-6 justify-center">
            <GeneralText
              title="Email Confirmation"
              description="Enter your email for verification"
            />

            <ShowToast
              message={sendError || sendSuccess}
              type={sendError ? "error" : sendSuccess ? "success" : "info"}
            />

            <EmailInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
            />

            <Button
              label={sendLoading ? "Sending..." : "Send Verification Code"}
              onPress={confirmEmail}
              disabled={isButtonDisabled}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default EmailConfirmation;
