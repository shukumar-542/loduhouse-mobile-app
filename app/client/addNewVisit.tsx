import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import Header from "@/components/shared/Header";
import AddNewVisitForm from "@/components/client/AddNewVisitForm";
import ShowToast from "@/components/shared/ShowToast";
import useAddNewVisit from "@/services/hooks/home/useAddNewVisit";

const AddNewVisit = () => {
  const { clientId } = useLocalSearchParams<{ clientId: string }>();

  const {
    formData,
    setField,
    submitVisit,
    isSubmitting,
    toastMessage,
    toastType,
    clearToast,
  } = useAddNewVisit();

  return (
    <View className="flex-1 bg-[#0F0B18]">
      <ShowToast
        message={toastMessage}
        type={toastType}
        onHide={() => {
          clearToast();
          if (toastType === "success") {
            router.push({
              pathname: "/tabs/analytics", // 👈 replace with your target screen
              params: { id: clientId },
            });
          }
        }}
      />
      <KeyboardAvoidingView
        className="flex-1"
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <Header title="Add New Visit" />
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 pt-8 justify-center px-5">
            <AddNewVisitForm formData={formData} setField={setField} />
          </View>

          {/* ── Save Button ── */}
          <TouchableOpacity
            onPress={() => submitVisit(clientId)}
            disabled={isSubmitting}
            className="mx-5 mt-4 mb-10 py-4 rounded-2xl items-center"
            style={{ backgroundColor: isSubmitting ? "#7a6240" : "#C9A367" }}
          >
            <Text className="text-white font-bold text-base">
              {isSubmitting ? "Saving…" : "Save Visit"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddNewVisit;
