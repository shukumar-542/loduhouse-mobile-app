import React, { useState, useRef } from "react";
import {
  View,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import EditProfileHeader from "@/components/shared/EditProfileHeader";
import EditProfileForm from "@/components/shared/EditProfileForm";
import DeleteModal from "@/components/shared/DeleteModal";
import ShowToast from "@/components/shared/ShowToast";
import { useClientEditProfile } from "@/services/hooks/home/useClientEditProfile";
import { useDeleteProfile } from "@/services/hooks/home/useDeleteProfile";
import { Trash2 } from "lucide-react-native";

const EditProfile = () => {
  const router = useRouter();

  const { id, fullName, phoneNumber, email, notes, image } =
    useLocalSearchParams<{
      id: string;
      fullName: string;
      phoneNumber: string;
      email: string;
      notes: string;
      image: string;
    }>();

  const clientInfo = { fullName, phoneNumber, email, notes, image };

  const {
    editProfile,
    successMessage,
    error: editError,
    isLoading: isSaving,
  } = useClientEditProfile();

  const {
    deleteProfile,
    isLoading: isDeleting,
    error: deleteError,
  } = useDeleteProfile();

  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const saveRef = useRef<() => void>(() => {});

  const toastMessage =
    editError ?? deleteError ?? deleteSuccess ?? successMessage ?? null;
  const toastType =
    editError || deleteError ? "error" : successMessage ? "success" : "info";

 const handleSave = async (updatedData: {
   fullName: string;
   phoneNumber: string;
   email: string;
   notes: string;
   image: string;
 }) => {
   const result = await editProfile({ id, ...updatedData });
   if (result.success) {
     setTimeout(() => {
       router.back();
     }, 1500);
   }
 };

 const handleDeleteConfirm = async () => {
   const result = await deleteProfile(id);
   setIsDeleteModalVisible(false);

   if (result.success) {
     setDeleteSuccess("Client deleted successfully.");
     setTimeout(() => {
       router.dismissAll(); 
       router.replace("/tabs/home"); 
     }, 1500);
   }
 };

  return (
    <View className="flex-1 bg-[#0F0B18]">
      <KeyboardAvoidingView
        className="flex-1"
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <ShowToast message={toastMessage} type={toastType} />

        <EditProfileHeader onEditPress={() => saveRef.current()} />

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <EditProfileForm
            name={clientInfo.fullName}
            profileImage={clientInfo.image}
            phone={clientInfo.phoneNumber}
            email={clientInfo.email}
            notes={clientInfo.notes}
            isLoading={isSaving}
            onSave={handleSave}
            registerSave={(fn) => {
              saveRef.current = fn;
            }}
          />
        </ScrollView>

        {/* Delete Button */}
        <View className="mb-4 mx-4 pb-5">
          <TouchableOpacity
            onPress={() => setIsDeleteModalVisible(true)}
            disabled={isDeleting}
            activeOpacity={0.7}
            className="w-full flex-row items-center justify-center gap-x-2"
            style={{
              borderWidth: 2,
              borderColor: "#82181A80",
              padding: 20,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 12,
              opacity: isDeleting ? 0.6 : 1,
            }}
          >
            {isDeleting ? (
              <ActivityIndicator size="small" color="#ef4444" />
            ) : (
              <>
                <Trash2 size={18} color="#ef4444" />
                <Text className="text-white font-semibold text-base text-center">
                  Delete Client
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      <DeleteModal
        isVisible={isDeleteModalVisible}
        onClose={() => !isDeleting && setIsDeleteModalVisible(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Client?"
        description={`Are you sure you want to delete ${fullName ?? "this client"}? This action cannot be undone.`}
        cancelText="Cancel"
        confirmText={isDeleting ? "Deleting..." : "Delete"}
      />
    </View>
  );
};

export default EditProfile;
