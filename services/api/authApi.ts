import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
    }),

    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    verifyOtp: builder.mutation({
      query: (body) => ({
        url: "/auth/verify-otp",
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
    }),

    register: builder.mutation({
      query: (body) => ({
        url: "/users/register",
        method: "POST",
        body,
      }),
    }),

    verifyRegistration: builder.mutation({
      query: (body) => ({
        url: "/users/verify-registration",
        method: "POST",
        body,
      }),
    }),

    // Google OAuth — fetches the authUrl from backend
    getGoogleAuthUrl: builder.query({
      query: () => ({
        url: "/auth/google",
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useRegisterMutation,
  useVerifyRegistrationMutation,
  useLazyGetGoogleAuthUrlQuery, // lazy so we trigger it on button press
} = authApi;
