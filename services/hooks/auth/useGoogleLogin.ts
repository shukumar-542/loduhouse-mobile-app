import { useCallback, useState } from "react";
import { useLazyGetGoogleAuthUrlQuery } from "@/services/api/authApi";

interface UseGoogleLoginReturn {
  initiateGoogleLogin: () => Promise<void>;
  authUrl: string | null;
  webViewVisible: boolean;
  closeWebView: () => void;
  loading: boolean;
  error: string | null;
  setError: (msg: string | null) => void;
}

const useGoogleLogin = (): UseGoogleLoginReturn => {
  const [authUrl, setAuthUrl] = useState<string | null>(null);
  const [webViewVisible, setWebViewVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [triggerGetGoogleUrl] = useLazyGetGoogleAuthUrlQuery();

  const initiateGoogleLogin = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await triggerGetGoogleUrl({}).unwrap();
      const url: string = result?.data?.authUrl;

      if (!url) throw new Error("Could not retrieve Google auth URL.");

      setAuthUrl(url);
      setWebViewVisible(true);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Google login failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [triggerGetGoogleUrl]);

  const closeWebView = useCallback(() => {
    setWebViewVisible(false);
    setAuthUrl(null);
  }, []);

  return {
    initiateGoogleLogin,
    authUrl,
    webViewVisible,
    closeWebView,
    loading,
    error,
    setError,
  };
};

export default useGoogleLogin;
