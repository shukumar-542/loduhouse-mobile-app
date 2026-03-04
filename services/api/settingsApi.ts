import { baseApi } from "./baseApi";

export interface UpdateProfileRequest {
  profilePicture?: any;
  fullName?: string;
  mobileNumber?: string;
  location?: string;
}

export interface UpdateProfileResponse {
  id: string;
  fullName: string;
  mobileNumber: string;
  location: string;
  profilePicture: string;
}

/* ------------------ Change Password ------------------ */

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
}

/* ------------------ App Content ------------------ */

export interface AppContentResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    type: string;
    content: string;
    createdAt?: string;
    updatedAt?: string;
  };
}
export interface LogoutResponse {
  success: boolean;
  message: string;
}
export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /* ------------------ Update Profile ------------------ */
    updateProfile: builder.mutation<
      UpdateProfileResponse,
      UpdateProfileRequest
    >({
      query: (data) => {
        const formData = new FormData();

        if (data.profilePicture) {
          formData.append("profilePicture", {
            uri: data.profilePicture.uri,
            name: data.profilePicture.fileName || "profile.jpg",
            type: data.profilePicture.type || "image/jpeg",
          } as any);
        }

        if (data.fullName) formData.append("fullName", data.fullName);
        if (data.mobileNumber)
          formData.append("mobileNumber", data.mobileNumber);
        if (data.location) formData.append("location", data.location);

        return {
          url: "/profile/",
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: ["Profile"],
    }),

    /* ------------------ Change Password ------------------ */
    changePasswordFromSettings: builder.mutation<
      ChangePasswordResponse,
      ChangePasswordRequest
    >({
      query: (data) => ({
        url: "/profile/change-password",
        method: "POST",
        body: data,
      }),
    }),

    /* ------------------ Terms & Conditions ------------------ */
    getTermsAndConditions: builder.query<AppContentResponse, void>({
      query: () => ({
        url: "/app-content/terms-and-conditions",
        method: "GET",
      }),
    }),

    /* ------------------ About Us ------------------ */
    getAboutUs: builder.query<AppContentResponse, void>({
      query: () => ({
        url: "/app-content/about-us",
        method: "GET",
      }),
    }),

    /* ------------------ Privacy Policy ------------------ */
    getPrivacyPolicy: builder.query<AppContentResponse, void>({
      query: () => ({
        url: "/app-content/privacy-policy",
        method: "GET",
      }),
    }),
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST", // or GET if your backend expects GET
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useUpdateProfileMutation,
  useChangePasswordFromSettingsMutation,
  useGetTermsAndConditionsQuery,
  useGetAboutUsQuery,
  useGetPrivacyPolicyQuery,
  useLogoutMutation,
} = settingsApi;
