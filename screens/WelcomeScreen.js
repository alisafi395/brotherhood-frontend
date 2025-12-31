// screens/WelcomeScreen.js
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

/**
 * ✅ MagicPatterns layout + animations
 * ✅ Uses Ionicons (same icon system you’ve been using)
 * ✅ Only the RULES list scrolls (header + footer stay fixed)
 * ✅ Navigates to "Signup"
 */

const ORANGE = "#FF5500";

export default function WelcomeScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-20)).current;
  const buttonFadeAnim = useRef(new Animated.Value(0)).current;
  const buttonSlideAnim = useRef(new Animated.Value(20)).current;

  const rules = [
    {
      icon: "people-outline",
      title: "Male-only, non-sexual platform",
      description: "A dedicated space for brotherhood and genuine connection.",
    },
    {
      icon: "location-outline",
      title: "Real-world group meets",
      description: "Designed to get you offline and into the real world.",
    },
    {
      icon: "chatbubble-ellipses-outline",
      title: "No dating. No DMs. Group-only",
      description: "Focus on community, not individual pursuit.",
    },
    {
      icon: "people-circle-outline",
      title: "Minimum 3 men per meet",
      description: "Safety and dynamic conversation in numbers.",
    },
    {
      icon: "finger-print-outline",
      title: "ID verification required",
      description: "Everyone is who they say they are. No exceptions.",
    },
  ];

  useEffect(() => {
    // Header animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // Button animation (delayed)
    Animated.parallel([
      Animated.timing(buttonFadeAnim, {
        toValue: 1,
        duration: 500,
        delay: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(buttonSlideAnim, {
        toValue: 0,
        duration: 500,
        delay: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, buttonFadeAnim, buttonSlideAnim]);

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.container}>
        {/* Background Gradient (top orange glow) */}
        <LinearGradient
          colors={["rgba(255, 85, 0, 0.10)", "transparent"]}
          style={styles.topGradient}
          pointerEvents="none"
        />
        {/* Bottom glow blob */}
        <View style={styles.bottomGlow} pointerEvents="none" />

        {/* Header (fixed) */}
        <View style={styles.header}>
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
          >
            <View style={styles.accentBar} />

            <Text style={styles.title}>
              Before you{"\n"}
              <Text style={styles.titleAccent}>join us.</Text>
            </Text>

            <Text style={styles.subtitle}>
              This community is built on trust, safety, and clear boundaries.
            </Text>
          </Animated.View>
        </View>

        {/* Rules List (ONLY scrollable area) */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {rules.map((rule, index) => (
            <RuleCard key={`${rule.title}-${index}`} rule={rule} index={index} />
          ))}

          {/* spacer so last card can scroll above the footer fade */}
          <View style={{ height: 140 }} />
        </ScrollView>

        {/* Footer CTA (fixed) */}
        <LinearGradient
          colors={["transparent", "#000000", "#000000"]}
          style={styles.footer}
          pointerEvents="box-none"
        >
          <Animated.View
            style={{
              opacity: buttonFadeAnim,
              transform: [{ translateY: buttonSlideAnim }],
            }}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate("Signup")}
              activeOpacity={0.9}
            >
              <Text style={styles.buttonText}>I Understand & Continue</Text>
              <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>

            <Text style={styles.disclaimer}>
              By continuing, you agree to our Community Standards.
            </Text>
          </Animated.View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

/** Rule Card Component with staggered animation */
function RuleCard({ rule, index }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        delay: 200 + index * 100,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        delay: 200 + index * 100,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim, index]);

  return (
    <Animated.View
      style={[
        styles.ruleCard,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={rule.icon} size={24} color={ORANGE} />
      </View>

      <View style={styles.ruleContent}>
        <Text style={styles.ruleTitle}>{rule.title}</Text>
        <Text style={styles.ruleDescription}>{rule.description}</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#000000",
  },

  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  topGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 256,
  },

  bottomGlow: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 256,
    height: 256,
    backgroundColor: "rgba(255, 85, 0, 0.05)",
    borderRadius: 256,
  },

  header: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 18,
    zIndex: 10,
  },

  accentBar: {
    height: 8,
    width: 48,
    backgroundColor: ORANGE,
    borderRadius: 4,
    marginBottom: 24,
  },

  title: {
    fontSize: 44,
    fontWeight: "900",
    color: "#FFFFFF",
    lineHeight: 52,
    letterSpacing: -0.5,
  },

  titleAccent: {
    color: ORANGE,
  },

  subtitle: {
    marginTop: 16,
    fontSize: 18,
    color: "#A1A1AA",
    lineHeight: 26,
    fontWeight: "600",
  },

  scrollView: {
    flex: 1,
    zIndex: 10,
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 24,
  },

  ruleCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    padding: 16,
    borderRadius: 18,
    backgroundColor: "rgba(39, 39, 42, 0.50)",
    borderWidth: 1,
    borderColor: "rgba(39, 39, 42, 0.50)",
  },

  iconContainer: {
    padding: 10,
    backgroundColor: "#18181B",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#27272A",
  },

  ruleContent: {
    flex: 1,
  },

  ruleTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#FFFFFF",
    lineHeight: 24,
    marginBottom: 4,
  },

  ruleDescription: {
    fontSize: 14,
    color: "#A1A1AA",
    lineHeight: 20,
    fontWeight: "600",
  },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 18,
    zIndex: 20,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: ORANGE,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 14,
    shadowColor: ORANGE,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  disclaimer: {
    marginTop: 16,
    textAlign: "center",
    fontSize: 14,
    color: "rgba(255,255,255,0.30)",
    fontWeight: "600",
  },
});
