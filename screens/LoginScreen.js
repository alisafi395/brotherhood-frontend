// screens/LoginScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useDevAuth } from "../hooks/Auth/useDevAuth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [remember, setRemember] = useState(true); // UI only for now
  const [googleLoading, setGoogleLoading] = useState(false);

  const { login, loading } = useDevAuth();

  const handleLoginPress = async () => {
    try {
      await login(email, password);
      Alert.alert("Success", "Logged in!");
      navigation.replace("Home"); // change to your real screen name
    } catch (e) {
      Alert.alert("Login failed", e?.message || "Something went wrong");
    }
  };

  const handleGooglePress = async () => {
    // Placeholder for Google login later
    try {
      setGoogleLoading(true);
      Alert.alert("Placeholder", "Google login will be implemented later (no Firebase for now).");
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleFacebookPress = () => {
    // Placeholder for Facebook login later
    Alert.alert("Placeholder", "Facebook login will be implemented later.");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* Spacer to push content down */}
        <View style={styles.topSpacer} />

        {/* Title */}
        <Text style={styles.title}>Login</Text>

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrap}>
          <TextInput
            placeholder="you@email.com"
            placeholderTextColor="#6B7280"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        {/* Password */}
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputWrap}>
          <TextInput
            placeholder="********"
            placeholderTextColor="#6B7280"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secure}
            autoCapitalize="none"
          />
          <Pressable onPress={() => setSecure((s) => !s)} hitSlop={10}>
            <Ionicons
              name={secure ? "eye-outline" : "eye-off-outline"}
              size={20}
              color="#6B7280"
            />
          </Pressable>
        </View>

        {/* Remember / Forgot */}
        <View style={styles.row}>
          <Pressable
            style={styles.remember}
            onPress={() => setRemember((r) => !r)}
            disabled={loading}
          >
            <View style={[styles.checkbox, remember && styles.checkboxActive]}>
              {remember && <Ionicons name="checkmark" size={14} color="#000" />}
            </View>
            <Text style={styles.rememberText}>Remember me</Text>
          </Pressable>

          <Pressable
            onPress={() => Alert.alert("Placeholder", "Forgot password later.")}
            disabled={loading}
          >
            <Text style={styles.forgot}>Forgot password?</Text>
          </Pressable>
        </View>

        {/* Login Button */}
        <Pressable
          onPress={handleLoginPress}
          disabled={loading}
          style={({ pressed }) => [
            styles.primaryBtn,
            pressed && !loading && { opacity: 0.85 },
            loading && { opacity: 0.6 },
          ]}
        >
          <Text style={styles.primaryText}>{loading ? "Signing in..." : "Login"}</Text>
        </Pressable>

        {/* Divider */}
        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>Or Login with</Text>
          <View style={styles.line} />
        </View>

        {/* Social buttons */}
        <View style={styles.socialRow}>
          <Pressable
            onPress={handleFacebookPress}
            disabled={loading || googleLoading}
            style={({ pressed }) => [
              styles.socialBtn,
              pressed && !(loading || googleLoading) && { opacity: 0.85 },
              (loading || googleLoading) && { opacity: 0.6 },
            ]}
          >
            <Ionicons name="logo-facebook" size={20} color="#1877F2" />
            <Text style={styles.socialText}>Facebook</Text>
          </Pressable>

          <Pressable
            onPress={handleGooglePress}
            disabled={loading || googleLoading}
            style={({ pressed }) => [
              styles.socialBtn,
              pressed && !(loading || googleLoading) && { opacity: 0.85 },
              (loading || googleLoading) && { opacity: 0.6 },
            ]}
          >
            <Ionicons name="logo-google" size={20} color="#EA4335" />
            <Text style={styles.socialText}>{googleLoading ? "Loading..." : "Google"}</Text>
          </Pressable>
        </View>

        {/* Footer (navigate to Signup) */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an account?{" "}
            <Text style={styles.footerLink} onPress={() => navigation.navigate("Signup")}>
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#0B0F14" },
  container: { flex: 1, paddingHorizontal: 22 },
  topSpacer: { height: 50 },
  title: { fontSize: 34, fontWeight: "800", color: "#fff", marginBottom: 24 },
  label: { color: "#9CA3AF", fontSize: 14, marginBottom: 6 },
  inputWrap: {
    height: 54,
    borderRadius: 16,
    backgroundColor: "#121826",
    borderWidth: 1,
    borderColor: "#1F2937",
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  input: { flex: 1, color: "#fff", fontSize: 16 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  remember: { flexDirection: "row", alignItems: "center", gap: 8 },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#6B7280",
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: { backgroundColor: "#4ADE80", borderColor: "#4ADE80" },
  rememberText: { color: "#9CA3AF", fontSize: 14 },
  forgot: { color: "#60A5FA", fontSize: 14, fontWeight: "600" },
  primaryBtn: {
    height: 56,
    borderRadius: 18,
    backgroundColor: "#F1872A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 26,
  },
  primaryText: { color: "#fff", fontSize: 18, fontWeight: "800" },
  dividerRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 20 },
  line: { flex: 1, height: 1, backgroundColor: "#1F2937" },
  orText: { color: "#9CA3AF", fontSize: 13, fontWeight: "600" },
  socialRow: { flexDirection: "row", gap: 12, marginBottom: 32 },
  socialBtn: {
    flex: 1,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#121826",
    borderWidth: 1,
    borderColor: "#1F2937",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  socialText: { color: "#E5E7EB", fontSize: 15, fontWeight: "700" },
  footer: { alignItems: "center", marginTop: "auto", paddingBottom: 16 },
  footerText: { color: "#9CA3AF", fontSize: 14 },
  footerLink: { color: "#60A5FA", fontWeight: "700" },
});
