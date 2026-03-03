import { baseApi } from "./baseApi";

export interface UpdateProfileRequest {
  profilePicture?: any; // React Native file object
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

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
  overrideExisting: false,
});

export const { useUpdateProfileMutation } = settingsApi;
