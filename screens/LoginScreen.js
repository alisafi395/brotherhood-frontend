// screens/LoginScreen.js
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { useLogin } from "../hooks/useLogin"; 
import { useUser } from "../context/UserContext";


const ORANGE = "#FF5500";

// Icon Components
const MailIcon = ({ size = 20, color = "#71717A" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <Path d="M22 6l-10 7L2 6" />
  </Svg>
);

const LockIcon = ({ size = 20, color = "#71717A" }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
    <Path d="M19 11H5c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2z" />
    <Path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </Svg>
);

// Google Logo Component
const GoogleLogo = () => (
  <Svg width={20} height={20} viewBox="0 0 24 24">
    <Path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <Path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <Path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <Path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </Svg>
);

export default function LoginScreen({ navigation }) {
  const { login, loading, error, setError } = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const { setUserFromLoginResponse } = useUser();


  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const logoScaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.spring(logoScaleAnim, {
      toValue: 1,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, logoScaleAnim]);

  const handleLogin = async () => {
    console.log(email)
    console.log(password)
    if (loading) return;

    try {
      const data = await login({ email, password });

      // ✅ You decide what backend returns. Typically:
      // data = { message, user, token }
      // For now just navigate:
      setUserFromLoginResponse(data);
      navigation.navigate("Home");
      


      // Optional:
      // Alert.alert("Success", data.message || "Logged in");
    } catch (e) {
      Alert.alert("Login failed", e?.message || "Something went wrong");
    }
  };

  const handleGoogle = () => {
    Alert.alert("Placeholder", "Google login later");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      {/* Background Glows */}
      <LinearGradient
        colors={["rgba(255, 85, 0, 0.1)", "transparent"]}
        style={styles.glowTop}
        pointerEvents="none"
      />
      <View style={styles.glowBottom} pointerEvents="none" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Logo/Brand */}
        <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoScaleAnim }] }]}>
          <View style={styles.logoCircle}>
            <View style={styles.logoBar} />
          </View>
        </Animated.View>

        {/* Header */}
        <Animated.View style={[styles.header, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue your journey</Text>
        </Animated.View>

        {/* Content */}
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          {/* Google */}
          <TouchableOpacity
            style={[styles.googleButton, loading && { opacity: 0.7 }]}
            onPress={handleGoogle}
            activeOpacity={0.8}
            disabled={loading}
          >
            <GoogleLogo />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>Or sign in with email</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Error banner */}
          {!!error && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          {/* Email */}
          <View style={styles.inputWrapper}>
            <View style={[styles.inputContainer, emailFocused && styles.inputContainerFocused]}>
              <View style={styles.iconContainer}>
                <MailIcon size={20} color={emailFocused ? ORANGE : "#71717A"} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Email address"
                placeholderTextColor="#52525B"
                value={email}
                onChangeText={(t) => {
                  setEmail(t);
                  if (error) setError("");
                }}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.inputWrapper}>
            <View style={[styles.inputContainer, passwordFocused && styles.inputContainerFocused]}>
              <View style={styles.iconContainer}>
                <LockIcon size={20} color={passwordFocused ? ORANGE : "#71717A"} />
              </View>
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#52525B"
                value={password}
                onChangeText={(t) => {
                  setPassword(t);
                  if (error) setError("");
                }}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPassword} activeOpacity={0.7}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>

          {/* Sign In */}
          <TouchableOpacity
            style={[styles.signInButton, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            activeOpacity={0.9}
            disabled={loading}
          >
            <Text style={styles.signInButtonText}>{loading ? "Signing in..." : "Sign In"}</Text>
          </TouchableOpacity>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")} activeOpacity={0.8}>
              <Text style={styles.signUpLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.termsText}>By continuing, you agree to our Terms & Privacy Policy.</Text>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000000" },

  glowTop: { position: "absolute", top: 0, left: 0, right: 0, height: 256 },
  glowBottom: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 256,
    height: 256,
    backgroundColor: "rgba(255, 85, 0, 0.05)",
    borderRadius: 128,
  },

  scrollView: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    justifyContent: "center",
  },

  logoContainer: { alignItems: "center", marginBottom: 40 },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255, 85, 0, 0.1)",
    borderWidth: 2,
    borderColor: ORANGE,
    alignItems: "center",
    justifyContent: "center",
  },
  logoBar: { width: 32, height: 6, backgroundColor: ORANGE, borderRadius: 3 },

  header: { marginBottom: 40, alignItems: "center" },
  title: { fontSize: 32, fontWeight: "bold", color: "#FFFFFF", marginBottom: 8, textAlign: "center" },
  subtitle: { fontSize: 16, color: "#A1A1AA", textAlign: "center" },

  content: { width: "100%" },

  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    gap: 8,
    marginBottom: 24,
  },
  googleButtonText: { fontSize: 16, fontWeight: "600", color: "#000000" },

  dividerContainer: { flexDirection: "row", alignItems: "center", marginVertical: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#27272A" },
  dividerText: { paddingHorizontal: 12, fontSize: 14, color: "#71717A", backgroundColor: "#000000" },

  errorBox: {
    borderWidth: 1,
    borderColor: "rgba(255,85,0,0.35)",
    backgroundColor: "rgba(255,85,0,0.08)",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 14,
  },
  errorText: { color: "#FFB199", fontSize: 13, fontWeight: "600" },

  inputWrapper: { marginBottom: 16 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(39, 39, 42, 0.5)",
    borderWidth: 1,
    borderColor: "#27272A",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  inputContainerFocused: { borderColor: ORANGE, backgroundColor: "rgba(39, 39, 42, 0.8)" },
  iconContainer: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, color: "#FFFFFF", paddingVertical: 12 },

  forgotPassword: { alignSelf: "flex-end", marginBottom: 24 },
  forgotPasswordText: { fontSize: 14, color: ORANGE, fontWeight: "500" },

  signInButton: {
    backgroundColor: ORANGE,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: ORANGE,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
    marginBottom: 24,
  },
  signInButtonText: { fontSize: 16, fontWeight: "600", color: "#FFFFFF" },

  signUpContainer: { flexDirection: "row", justifyContent: "center", alignItems: "center", marginBottom: 24 },
  signUpText: { fontSize: 14, color: "#A1A1AA" },
  signUpLink: { fontSize: 14, color: ORANGE, fontWeight: "600" },

  termsText: { fontSize: 12, color: "#52525B", textAlign: "center" },
});
