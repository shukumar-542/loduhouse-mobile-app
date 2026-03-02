import "dotenv/config";
import type { ConfigContext } from "@expo/config";

export default ({ config }: ConfigContext) => ({
  ...config,
  scheme: "recallpro",
  plugins: [...(config.plugins ?? []), "expo-web-browser"],
  extra: {
    ...config.extra,
    apiBaseUrl: process.env.BASE_API_URL ?? "",
  },
});
