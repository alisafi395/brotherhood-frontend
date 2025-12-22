import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

import { auth } from "./firebase";
import { syncUserWithBackend } from "./backend";

WebBrowser.maybeCompleteAuthSession();

export function useGoogleSignIn() {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    // ✅ For Expo Go, use Web OAuth client ID here
    clientId: "914124188144-s5573aukmd4m2r4haqc929dds34pav1p.apps.googleusercontent.com",
  });

  const startGoogleSignIn = async () => {
    // ✅ Force Expo proxy (gives auth.expo.io redirect)
    return promptAsync({ useProxy: true });
  };

  const finishGoogleSignIn = async () => {
    if (response?.type !== "success") return { ok: false };

    const googleIdToken = response?.params?.id_token;
    if (!googleIdToken) return { ok: false, error: "Google id_token not returned" };

    const credential = GoogleAuthProvider.credential(googleIdToken);
    const userCred = await signInWithCredential(auth, credential);

    const firebaseIdToken = await userCred.user.getIdToken();
    const backendResult = await syncUserWithBackend(firebaseIdToken);

    return { ok: true, backendResult };
  };

  return { request, response, startGoogleSignIn, finishGoogleSignIn };
}
