import React, { useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  BackHandler,
  Image,
} from "react-native";
import LoginLogo from "@/assets/images/Logo.png";
import SvgIcon from "@/components/shared/svgIcon";
import AuthText from "@/components/auth/AuthText";
import { EmailInput } from "@/components/shared/EmailField";
import PasswordInput from "@/components/shared/PasswordField";
import { Button } from "@/components/shared/Button";
import GoogleButton from "@/components/auth/GoogleButton";
import googleSvg from "@/assets/images/auth/google-button.svg";
import { Check } from "lucide-react-native";
import ShowToast from "@/components/shared/ShowToast";
import { useRouter, useFocusEffect, useNavigation } from "expo-router";
import useLogin from "@/services/hooks/auth/useLogin";
import useGoogleLogin from "@/services/hooks/auth/useGoogleLogin";
import GoogleAuthWebView from "@/components/shared/GoogleAuthWebView";

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    loading,
    error,
    successMessage,
    login,
  } = useLogin();

  const {
    initiateGoogleLogin,
    authUrl,
    webViewVisible,
    closeWebView,
    loading: googleLoading,
    error: googleError,
    setError: setGoogleError,
  } = useGoogleLogin();

  const { width } = Dimensions.get("window");
  const router = useRouter();
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        gestureEnabled: false,
        headerBackVisible: false,
      });
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        () => true,
      );
      return () => subscription.remove();
    }, [navigation]),
  );

  useEffect(() => {
    if (successMessage && !error) {
      router.replace("/subscription/subscriptions");
    }
  }, [successMessage, error, router]);

  const displayError = error || googleError;

  return (
    <View className="flex-1 bg-[#0F0918]">
      <KeyboardAvoidingView
        className="flex-1"
        behavior="padding"
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 px-6 pt-8 pb-6 justify-center">
            <View className="items-center mb-4 px-5">
              <Image source={LoginLogo} style={{ width: "100%", height: 100 }} />
            </View>

            <AuthText
              title="Log In"
              description="Welcome Back"
            />

            <ShowToast
              message={displayError || successMessage}
              type={
                displayError ? "error" : successMessage ? "success" : "info"
              }
            />

            <View>
              <EmailInput
                label="Email"
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
              />
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
              />

              <View className="flex-row justify-between items-center py-2 my-3">
                <TouchableOpacity
                  onPress={() => setRememberMe(!rememberMe)}
                  className="flex-row items-center"
                >
                  <View
                    className={`w-5 h-5 border rounded mr-2 flex items-center justify-center ${
                      rememberMe ? "border-green-700" : "border-white"
                    }`}
                  >
                    {rememberMe && <Check size={14} color="#22c55e" />}
                  </View>
                  <Text
                    className={`text-xs ${rememberMe ? "text-white" : "text-gray-400"}`}
                  >
                    Remember me
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push("/auth/emailConfirmation")}
                >
                  <Text className="text-red-700 text-xs font-bold">
                    Forgot password
                  </Text>
                </TouchableOpacity>
              </View>

              <Button
                label={loading ? "Logging in..." : "Login"}
                onPress={login}
                disabled={loading || googleLoading}
              />
            </View>

            <View className="flex-row items-center my-6">
              <View className="flex-1 h-[0.5px] bg-gray-800" />
              <Text className="text-gray-500 mx-4 text-xs">
                or continue with
              </Text>
              <View className="flex-1 h-[0.5px] bg-gray-800" />
            </View>

            <View className="items-center">
              <Text className="text-gray-400 mb-4">
                Don't have an account?{" "}
                <Text
                  className="text-white font-bold"
                  onPress={() => router.push("/auth/register")}
                >
                  Register
                </Text>
              </Text>

              <GoogleButton
                label={googleLoading ? "Loading..." : "Sign In with Google"}
                onPress={initiateGoogleLogin}
                SvgComponent={googleSvg}
                disabled={googleLoading}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <GoogleAuthWebView
        visible={webViewVisible}
        authUrl={authUrl ?? ""}
        onClose={closeWebView}
        onError={(msg) => setGoogleError(msg)}
      />
    </View>
  );
};

export default Login;
