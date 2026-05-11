import React, { useEffect } from "react";
import { View, ScrollView, KeyboardAvoidingView } from "react-native";
import { useRouter } from "expo-router";

import { Button } from "@/components/shared/Button";
import ShowToast from "@/components/shared/ShowToast";
import PasswordInput from "@/components/shared/PasswordField";
import useChangePasswordFromSettings from "@/services/hooks/settings/useChangePasswordFromSettings";
import Header from "@/components/shared/Header";

const ChangePasswordFromSettings = () => {
  const router = useRouter();

  const {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    loading,
    error,
    successMessage,
    handleChangePassword,
  } = useChangePasswordFromSettings();

  useEffect(() => {
    if (successMessage) {
      router.replace("/auth/login");
    }
  }, [successMessage, router]);

  const isButtonDisabled =
    !oldPassword || !newPassword || !confirmPassword || loading;

  return (
    <View className="flex-1 bg-[#000000]">
      <KeyboardAvoidingView className="flex-1" behavior="padding">
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 pt-8 pb-6 ">


            <Header title="Change Password" />

            <ShowToast
              message={error || successMessage}
              type={error ? "error" : successMessage ? "success" : "info"}
            />

            <View className="mt-10">
              <PasswordInput
                label="Current Password"
                placeholder="**********"
                value={oldPassword}
                onChangeText={setOldPassword}
              />

              <PasswordInput
                label="New Password"
                placeholder="**********"
                value={newPassword}
                onChangeText={setNewPassword}
              />

              <PasswordInput
                label="Confirm New Password"
                placeholder="**********"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
            <View className="flex-1 justify-end">

              <View className="py-3">
                <Button
                  label={loading ? "Updating Password..." : "Update Password"}
                  onPress={handleChangePassword}
                  disabled={isButtonDisabled}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChangePasswordFromSettings;
