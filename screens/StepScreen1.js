// screens/StepScreen1.js
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

export default function StepScreen1({ navigation, route }) {
  // carry anything forward if you already pass params from Signup
  const prev = route?.params || {};

  const [firstName, setFirstName] = useState(prev.firstName || "");
  const [age, setAge] = useState(prev.age ? String(prev.age) : "");
  const [city, setCity] = useState(prev.city || "");
  const [profession, setProfession] = useState(prev.profession || "");

  const [firstNameFocused, setFirstNameFocused] = useState(false);
  const [ageFocused, setAgeFocused] = useState(false);
  const [cityFocused, setCityFocused] = useState(false);
  const [professionFocused, setProfessionFocused] = useState(false);

  // Animation refs
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

  const goNext = () => {
    navigation.navigate("Step2", {
      ...prev,
      firstName,
      age,
      city,
      profession,
    });
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
            <Text style={styles.title}>The Basics</Text>
            <Text style={styles.subtitle}>
              Just enough to coordinate. No bios, no last name
            </Text>
          </Animated.View>

          {/* Content */}
          <Animated.View style={[styles.content, { opacity: contentFadeAnim }]}>
            {/* First Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>First Name or Nickname</Text>
              <View style={[styles.inputContainer, firstNameFocused && styles.inputContainerFocused]}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={firstNameFocused ? ORANGE : "#71717A"}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Alex"
                  placeholderTextColor="#52525B"
                  value={firstName}
                  onChangeText={setFirstName}
                  onFocus={() => setFirstNameFocused(true)}
                  onBlur={() => setFirstNameFocused(false)}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Age */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Age</Text>
              <View style={[styles.inputContainer, ageFocused && styles.inputContainerFocused]}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color={ageFocused ? ORANGE : "#71717A"}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. 28"
                  placeholderTextColor="#52525B"
                  value={age}
                  onChangeText={setAge}
                  onFocus={() => setAgeFocused(true)}
                  onBlur={() => setAgeFocused(false)}
                  keyboardType="number-pad"
                  maxLength={2}
                />
              </View>
            </View>

            {/* City */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>City</Text>
              <View style={[styles.inputContainer, cityFocused && styles.inputContainerFocused]}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="location-outline"
                    size={20}
                    color={cityFocused ? ORANGE : "#71717A"}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Austin"
                  placeholderTextColor="#52525B"
                  value={city}
                  onChangeText={setCity}
                  onFocus={() => setCityFocused(true)}
                  onBlur={() => setCityFocused(false)}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Profession (added) */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Profession (or what you do)</Text>
              <View
                style={[styles.inputContainer, professionFocused && styles.inputContainerFocused]}
              >
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="briefcase-outline"
                    size={20}
                    color={professionFocused ? ORANGE : "#71717A"}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Student, Sales, Electrician"
                  placeholderTextColor="#52525B"
                  value={profession}
                  onChangeText={setProfession}
                  onFocus={() => setProfessionFocused(true)}
                  onBlur={() => setProfessionFocused(false)}
                  autoCapitalize="words"
                  autoCorrect={false}
                  returnKeyType="done"
                />
              </View>
            </View>

            {/* Platform Rules Card */}
            <View style={styles.rulesCard}>
              <Text style={styles.rulesTitle}>Platform Rules</Text>

              <View style={styles.rulesList}>
                <View style={styles.ruleItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.ruleText}>No profile photos allowed</Text>
                </View>

                <View style={styles.ruleItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.ruleText}>No last names required</Text>
                </View>

                <View style={styles.ruleItem}>
                  <View style={styles.bullet} />
                  <Text style={styles.ruleText}>No lengthy bios needed</Text>
                </View>
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
            <TouchableOpacity style={styles.continueButton} onPress={goNext} activeOpacity={0.9}>
              <Text style={styles.continueButtonText}>Continue</Text>
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
  title: { fontSize: 32, fontWeight: "900", color: "#FFFFFF", marginBottom: 12 },
  subtitle: { fontSize: 16, color: "#A1A1AA", lineHeight: 24, fontWeight: "600" },

  content: { flex: 1 },

  inputGroup: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: "600", color: "#A1A1AA", marginBottom: 8 },

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

  rulesCard: {
    backgroundColor: "rgba(39, 39, 42, 0.5)",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#27272A",
    marginTop: 8,
  },
  rulesTitle: { fontSize: 14, fontWeight: "700", color: "#A1A1AA", marginBottom: 12 },

  rulesList: { gap: 8 },
  ruleItem: { flexDirection: "row", alignItems: "flex-start", gap: 12 },

  bullet: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#71717A",
    marginTop: 8,
  },

  ruleText: { flex: 1, fontSize: 14, color: "#71717A", lineHeight: 20, fontWeight: "600" },

  footer: { marginTop: "auto", paddingTop: 24 },

  continueButton: {
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
  continueButtonText: { fontSize: 16, fontWeight: "800", color: "#FFFFFF" },
});
