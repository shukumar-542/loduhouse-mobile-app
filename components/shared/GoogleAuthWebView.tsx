import React, { useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import { X } from "lucide-react-native";
import * as SecureStore from "expo-secure-store";
import { useRouter } from "expo-router";

export const TOKEN_KEY = "token";
export const REFRESH_TOKEN_KEY = "refreshToken";

const SUCCESS_URL_PATTERN = "auth/google/callback";

interface GoogleAuthWebViewProps {
  visible: boolean;
  authUrl: string;
  onClose: () => void;
  onError: (message: string) => void;
}

const GoogleAuthWebView: React.FC<GoogleAuthWebViewProps> = ({
  visible,
  authUrl,
  onClose,
  onError,
}) => {
  const [loading, setLoading] = useState(true);
  const webViewRef = useRef<WebView>(null);
  const router = useRouter();

  const handleNavigationChange = async (navState: WebViewNavigation) => {
    const { url } = navState;
    if (!url) return;

    if (url.includes(SUCCESS_URL_PATTERN)) {
      try {
        const parsed = new URL(url);
        const token = parsed.searchParams.get("token");
        const refreshToken = parsed.searchParams.get("refreshToken");

        if (!token) {
          onError("Google login failed. No token received.");
          onClose();
          return;
        }

        await SecureStore.setItemAsync(TOKEN_KEY, token);
        if (refreshToken) {
          await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);
        }

        onClose();
        router.replace("/subscription/subscriptions");
      } catch {
        onError("Failed to process Google login response.");
        onClose();
      }
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Sign in with Google</Text>
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <X size={22} color="#ffffff" />
          </TouchableOpacity>
        </View>

        {/* Loading overlay */}
        {loading && (
          <View style={styles.loadingOverlay}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.loadingText}>Loading Google Sign In...</Text>
          </View>
        )}

        {/* WebView */}
        {authUrl ? (
          <WebView
            ref={webViewRef}
            source={{ uri: authUrl }}
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            onNavigationStateChange={handleNavigationChange}
            onError={() => {
              onError("Failed to load Google sign in.");
              onClose();
            }}
            incognito
            sharedCookiesEnabled={false}
            thirdPartyCookiesEnabled={false}
            style={styles.webview}
            userAgent="Mozilla/5.0 (Linux; Android 10; Mobile) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36"
          />
        ) : null}
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F1F2",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#172434",
    position: "relative",
  },
  headerTitle: {
    color: "#F1F1F2",
    fontSize: 16,
    fontWeight: "600",
  },
  closeButton: {
    position: "absolute",
    right: 16,
    padding: 4,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#172434",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  loadingText: {
    color: "#172434",
    marginTop: 12,
    fontSize: 14,
  },
  webview: {
    flex: 1,
    backgroundColor: "#172434",
  },
});

export default GoogleAuthWebView;
