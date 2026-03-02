import Constants from "expo-constants";

const apiBaseUrl = Constants.expoConfig?.extra?.apiBaseUrl ?? "";

if (!apiBaseUrl) {
  throw new Error("API Base URL is not defined");
}

export const API_BASE_URL = apiBaseUrl;
