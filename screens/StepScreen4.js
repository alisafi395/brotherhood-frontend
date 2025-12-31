// screens/StepScreen4.js
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const ORANGE = "#FF5500";

export default function StepScreen4({ navigation, route }) {
  const prev = route?.params || {};

  const [idStep, setIdStep] = useState("idle"); // 'idle' | 'uploading' | 'complete'
  const [selfieStep, setSelfieStep] = useState("idle"); // 'idle' | 'uploading' | 'complete'

  // Animations
  const headerFadeAnim = useRef(new Animated.Value(0)).current;
  const headerSlideAnim = useRef(new Animated.Value(20)).current;
  const step1FadeAnim = useRef(new Animated.Value(0)).current;
  const step1SlideAnim = useRef(new Animated.Value(20)).current;
  const step2FadeAnim = useRef(new Animated.Value(0)).current;
  const step2SlideAnim = useRef(new Animated.Value(20)).current;
  const noticeFadeAnim = useRef(new Animated.Value(0)).current;
  const footerFadeAnim = useRef(new Animated.Value(0)).current;
  const footerSlideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(headerSlideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();

    Animated.parallel([
      Animated.timing(step1FadeAnim, { toValue: 1, duration: 400, delay: 100, useNativeDriver: true }),
      Animated.timing(step1SlideAnim, { toValue: 0, duration: 400, delay: 100, useNativeDriver: true }),
    ]).start();

    Animated.parallel([
      Animated.timing(step2FadeAnim, { toValue: 1, duration: 400, delay: 200, useNativeDriver: true }),
      Animated.timing(step2SlideAnim, { toValue: 0, duration: 400, delay: 200, useNativeDriver: true }),
    ]).start();

    Animated.timing(noticeFadeAnim, { toValue: 1, duration: 400, delay: 300, useNativeDriver: true }).start();

    Animated.parallel([
      Animated.timing(footerFadeAnim, { toValue: 1, duration: 400, delay: 400, useNativeDriver: true }),
      Animated.timing(footerSlideAnim, { toValue: 0, duration: 400, delay: 400, useNativeDriver: true }),
    ]).start();
  }, [
    headerFadeAnim,
    headerSlideAnim,
    step1FadeAnim,
    step1SlideAnim,
    step2FadeAnim,
    step2SlideAnim,
    noticeFadeAnim,
    footerFadeAnim,
    footerSlideAnim,
  ]);

  // NOTE: This file keeps your exact UI/flow.
  // Hook your Expo Camera + upload later by replacing these simulators.
  const handleIdUpload = () => {
    setIdStep("uploading");
    setTimeout(() => setIdStep("complete"), 1500);
  };

  const handleSelfieUpload = () => {
    setSelfieStep("uploading");
    setTimeout(() => setSelfieStep("complete"), 1500);
  };

  const isComplete = idStep === "complete" && selfieStep === "complete";
  const buttonText = isComplete ? "Complete Verification" : "Complete Both Steps";

  // If you want to allow navigating regardless (like earlier screens), remove disabled logic below.
  const onFinish = () => {
    navigation.navigate("Home", {
      ...prev,
      verification: { id: idStep, selfie: selfieStep, complete: isComplete },
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.container}>
        {/* Header */}
        <Animated.View
          style={[
            styles.header,
            { opacity: headerFadeAnim, transform: [{ translateY: headerSlideAnim }] },
          ]}
        >
          <View style={styles.titleRow}>
            <View style={styles.shieldContainer}>
              <Ionicons name="shield-checkmark-outline" size={24} color={ORANGE} />
            </View>
            <Text style={styles.title}>Safety Verification</Text>
          </View>

          <Text style={styles.subtitle}>
            Before you can join chats or attend meets, we need to verify your identity to keep
            in-person groups safe.
          </Text>
        </Animated.View>

        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Step 1 */}
          <Animated.View
            style={[
              styles.stepContainer,
              { opacity: step1FadeAnim, transform: [{ translateY: step1SlideAnim }] },
            ]}
          >
            <View style={styles.stepHeader}>
              <View style={[styles.stepNumber, idStep === "complete" && styles.stepNumberComplete]}>
                {idStep === "complete" ? (
                  <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                ) : (
                  <Text style={styles.stepNumberText}>1</Text>
                )}
              </View>
              <Text style={styles.stepTitle}>Government ID</Text>
            </View>

            <View style={[styles.uploadBox, idStep === "complete" && styles.uploadBoxComplete]}>
              {idStep === "idle" && (
                <View style={styles.uploadContent}>
                  <View style={styles.iconCircle}>
                    <Ionicons name="camera-outline" size={32} color="#71717A" />
                  </View>

                  <Text style={styles.uploadTitle}>Upload Government ID</Text>
                  <Text style={styles.uploadDescription}>
                    Driver&apos;s license, Passport, or National ID
                  </Text>

                  <TouchableOpacity style={styles.uploadButton} onPress={handleIdUpload} activeOpacity={0.8}>
                    <Ionicons name="cloud-upload-outline" size={18} color="#FFFFFF" />
                    <Text style={styles.uploadButtonText}>Choose File</Text>
                  </TouchableOpacity>
                </View>
              )}

              {idStep === "uploading" && (
                <View style={styles.uploadContent}>
                  <View style={[styles.iconCircle, styles.iconCircleActive]}>
                    <ActivityIndicator size="large" color={ORANGE} />
                  </View>
                  <Text style={styles.uploadTitle}>Uploading...</Text>
                </View>
              )}

              {idStep === "complete" && (
                <View style={styles.uploadContent}>
                  <View style={[styles.iconCircle, styles.iconCircleActive]}>
                    <Ionicons name="checkmark-circle-outline" size={32} color={ORANGE} />
                  </View>
                  <Text style={styles.uploadTitle}>ID Uploaded Successfully</Text>
                  <Text style={styles.uploadSubtext}>Encrypted and secure</Text>
                </View>
              )}
            </View>
          </Animated.View>

          {/* Step 2 */}
          <Animated.View
            style={[
              styles.stepContainer,
              { opacity: step2FadeAnim, transform: [{ translateY: step2SlideAnim }] },
            ]}
          >
            <View style={styles.stepHeader}>
              <View
                style={[
                  styles.stepNumber,
                  selfieStep === "complete" && styles.stepNumberComplete,
                ]}
              >
                {selfieStep === "complete" ? (
                  <Ionicons name="checkmark" size={18} color="#FFFFFF" />
                ) : (
                  <Text style={styles.stepNumberText}>2</Text>
                )}
              </View>
              <Text style={styles.stepTitle}>Live Selfie</Text>
            </View>

            <View
              style={[
                styles.uploadBox,
                selfieStep === "complete" && styles.uploadBoxComplete,
                idStep !== "complete" && styles.uploadBoxDisabled,
              ]}
            >
              {selfieStep === "idle" && (
                <View style={styles.uploadContent}>
                  <View style={styles.iconCircle}>
                    <Ionicons name="camera-outline" size={32} color="#71717A" />
                  </View>

                  <Text style={styles.uploadTitle}>Take a Live Selfie</Text>
                  <Text style={styles.uploadDescription}>
                    For identity verification and liveness check
                  </Text>

                  <TouchableOpacity
                    style={[
                      styles.uploadButton,
                      idStep !== "complete" && styles.uploadButtonDisabled,
                    ]}
                    onPress={handleSelfieUpload}
                    disabled={idStep !== "complete"}
                    activeOpacity={0.8}
                  >
                    <Ionicons
                      name="camera-outline"
                      size={18}
                      color={idStep === "complete" ? "#FFFFFF" : "#52525B"}
                    />
                    <Text
                      style={[
                        styles.uploadButtonText,
                        idStep !== "complete" && styles.uploadButtonTextDisabled,
                      ]}
                    >
                      Open Camera
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {selfieStep === "uploading" && (
                <View style={styles.uploadContent}>
                  <View style={[styles.iconCircle, styles.iconCircleActive]}>
                    <ActivityIndicator size="large" color={ORANGE} />
                  </View>
                  <Text style={styles.uploadTitle}>Processing...</Text>
                </View>
              )}

              {selfieStep === "complete" && (
                <View style={styles.uploadContent}>
                  <View style={[styles.iconCircle, styles.iconCircleActive]}>
                    <Ionicons name="checkmark-circle-outline" size={32} color={ORANGE} />
                  </View>
                  <Text style={styles.uploadTitle}>Verification Complete</Text>
                  <Text style={styles.uploadSubtext}>Identity confirmed</Text>
                </View>
              )}
            </View>
          </Animated.View>

          {/* Security Notice */}
          <Animated.View style={[styles.noticeContainer, { opacity: noticeFadeAnim }]}>
            <Ionicons name="alert-circle-outline" size={20} color="#71717A" />
            <Text style={styles.noticeText}>
              Your ID is encrypted and only used for verification. We store your verification status
              only—not your ID images.
            </Text>
          </Animated.View>
        </ScrollView>

        {/* Footer */}
        <Animated.View
          style={[
            styles.footer,
            { opacity: footerFadeAnim, transform: [{ translateY: footerSlideAnim }] },
          ]}
        >
          <TouchableOpacity
            style={[styles.completeButton, !isComplete && styles.completeButtonDisabled]}
            onPress={onFinish}
            disabled={!isComplete}
            activeOpacity={0.9}
          >
            <Text style={[styles.completeButtonText, !isComplete && styles.completeButtonTextDisabled]}>
              {buttonText}
            </Text>
          </TouchableOpacity>

          <Text style={styles.disclaimer}>This step is required and cannot be skipped.</Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000000" },

  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 24,
  },

  header: { marginBottom: 24 },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },

  shieldContainer: {
    padding: 8,
    backgroundColor: "rgba(255, 85, 0, 0.10)",
    borderRadius: 8,
  },

  title: { fontSize: 32, fontWeight: "900", color: "#FFFFFF", flex: 1 },

  subtitle: { fontSize: 16, color: "#A1A1AA", lineHeight: 24, fontWeight: "600" },

  scrollView: {
    flex: 1,
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },

  scrollContent: { paddingBottom: 16 },

  stepContainer: { marginBottom: 24 },

  stepHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },

  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#27272A",
    alignItems: "center",
    justifyContent: "center",
  },

  stepNumberComplete: { backgroundColor: ORANGE },

  stepNumberText: { fontSize: 14, fontWeight: "900", color: "#A1A1AA" },

  stepTitle: { fontSize: 18, fontWeight: "800", color: "#FFFFFF" },

  uploadBox: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#27272A",
    borderRadius: 16,
    backgroundColor: "rgba(39, 39, 42, 0.5)",
    padding: 32,
  },

  uploadBoxComplete: {
    borderColor: ORANGE,
    backgroundColor: "rgba(255, 85, 0, 0.05)",
  },

  uploadBoxDisabled: { opacity: 0.5 },

  uploadContent: { alignItems: "center" },

  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#27272A",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  iconCircleActive: { backgroundColor: "rgba(255, 85, 0, 0.10)" },

  uploadTitle: { fontSize: 16, fontWeight: "800", color: "#FFFFFF", marginBottom: 8 },

  uploadDescription: {
    fontSize: 14,
    color: "#71717A",
    textAlign: "center",
    marginBottom: 16,
    fontWeight: "600",
  },

  uploadSubtext: { fontSize: 14, color: "#71717A", marginTop: 4, fontWeight: "600" },

  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },

  uploadButtonDisabled: {
    borderColor: "#27272A",
    backgroundColor: "#18181B",
  },

  uploadButtonText: { fontSize: 14, fontWeight: "800", color: "#FFFFFF" },

  uploadButtonTextDisabled: { color: "#52525B" },

  noticeContainer: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "rgba(39, 39, 42, 0.5)",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#27272A",
    marginTop: 8,
  },

  noticeText: { flex: 1, fontSize: 14, color: "#A1A1AA", lineHeight: 20, fontWeight: "600" },

  footer: { paddingTop: 24 },

  completeButton: {
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

  completeButtonDisabled: {
    backgroundColor: "#27272A",
    shadowOpacity: 0,
    elevation: 0,
  },

  completeButtonText: { fontSize: 16, fontWeight: "800", color: "#FFFFFF" },

  completeButtonTextDisabled: { color: "#71717A" },

  disclaimer: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 14,
    color: "rgba(255,255,255,0.30)",
    fontWeight: "600",
  },
});
