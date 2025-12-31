// screens/SignupScreen.js
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const ORANGE = "#FF5500";

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // Animations
  const headerFadeAnim = useRef(new Animated.Value(0)).current;
  const headerSlideAnim = useRef(new Animated.Value(20)).current;
  const contentFadeAnim = useRef(new Animated.Value(0)).current;
  const footerFadeAnim = useRef(new Animated.Value(0)).current;
  const footerSlideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.timing(headerSlideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    Animated.timing(contentFadeAnim, {
      toValue: 1,
      duration: 400,
      delay: 200,
      useNativeDriver: true,
    }).start();

    Animated.parallel([
      Animated.timing(footerFadeAnim, {
        toValue: 1,
        duration: 400,
        delay: 400,
        useNativeDriver: true,
      }),
      Animated.timing(footerSlideAnim, {
        toValue: 0,
        duration: 400,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, [headerFadeAnim, headerSlideAnim, contentFadeAnim, footerFadeAnim, footerSlideAnim]);

  // ✅ No checks. Always navigate forward.
  const goNext = () => {
    navigation.navigate("Step1");
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <Animated.View
            style={[
              styles.header,
              {
                opacity: headerFadeAnim,
                transform: [{ translateY: headerSlideAnim }],
              },
            ]}
          >
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Start your journey with us.</Text>
          </Animated.View>

          {/* Content */}
          <Animated.View style={[styles.content, { opacity: contentFadeAnim }]}>
            {/* Google button */}
            <TouchableOpacity style={styles.googleButton} onPress={goNext} activeOpacity={0.85}>
              <Ionicons name="logo-google" size={20} color="#000" />
              <Text style={styles.googleButtonText}>Continue with Google</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>Or continue with email</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Email */}
            <View style={styles.inputWrapper}>
              <View style={[styles.inputContainer, emailFocused && styles.inputContainerFocused]}>
                <View style={styles.iconContainer}>
                  <Ionicons name="mail-outline" size={20} color={emailFocused ? ORANGE : "#71717A"} />
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="Email address"
                  placeholderTextColor="#52525B"
                  value={email}
                  onChangeText={setEmail}
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
              <View
                style={[styles.inputContainer, passwordFocused && styles.inputContainerFocused]}
              >
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color={passwordFocused ? ORANGE : "#71717A"}
                  />
                </View>

                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#52525B"
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  secureTextEntry={secure}
                  autoCapitalize="none"
                  autoCorrect={false}
                />

                <TouchableOpacity
                  onPress={() => setSecure((s) => !s)}
                  activeOpacity={0.8}
                  style={styles.eyeBtn}
                >
                  <Ionicons
                    name={secure ? "eye-outline" : "eye-off-outline"}
                    size={20}
                    color="#71717A"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Animated.View>

          {/* Footer */}
          <Animated.View
            style={[
              styles.footer,
              { opacity: footerFadeAnim, transform: [{ translateY: footerSlideAnim }] },
            ]}
          >
            {/* ✅ No checks. Always navigate forward. */}
            <TouchableOpacity style={styles.createButton} onPress={goNext} activeOpacity={0.9}>
              <Text style={styles.createButtonText}>Create Account</Text>
            </TouchableOpacity>

            <Text style={styles.disclaimer}>
              By signing up, you agree to our Terms & Privacy Policy.
            </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              activeOpacity={0.8}
              style={{ marginTop: 14, alignSelf: "center" }}
            >
              <Text style={styles.loginText}>
                Already have an account? <Text style={styles.loginLink}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000000" },
  container: { flex: 1, backgroundColor: "#000000" },

  scrollView: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },

  header: { marginBottom: 32 },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 12,
    letterSpacing: -0.2,
  },
  subtitle: { fontSize: 16, color: "#A1A1AA", fontWeight: "600" },

  content: { flex: 1 },

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
  },
  googleButtonText: { fontSize: 16, fontWeight: "700", color: "#000000" },

  dividerContainer: { flexDirection: "row", alignItems: "center", marginVertical: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: "#27272A" },
  dividerText: {
    paddingHorizontal: 12,
    fontSize: 14,
    color: "#71717A",
    backgroundColor: "#000000",
    fontWeight: "600",
  },

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
  inputContainerFocused: {
    borderColor: ORANGE,
    backgroundColor: "rgba(39, 39, 42, 0.8)",
  },
  iconContainer: { marginRight: 12 },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
    paddingVertical: 12,
    fontWeight: "600",
  },
  eyeBtn: { paddingLeft: 10, paddingVertical: 10 },

  footer: { marginTop: "auto", paddingTop: 24 },
  createButton: {
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
  },
  createButtonText: { fontSize: 16, fontWeight: "800", color: "#FFFFFF" },

  disclaimer: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 14,
    color: "rgba(255,255,255,0.30)",
    fontWeight: "600",
    lineHeight: 20,
  },

  loginText: { color: "rgba(255,255,255,0.45)", fontSize: 14, fontWeight: "600" },
  loginLink: { color: ORANGE, fontWeight: "800" },
});
