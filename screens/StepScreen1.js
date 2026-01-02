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

// ✅ 10 broad profession categories
const PROFESSION_OPTIONS = [
  "Technology",
  "Sales",
  "Finance",
  "Healthcare",
  "Education",
  "Trades",
  "Business / Entrepreneurship",
  "Creative",
  "Student",
  "Other",
];

export default function StepScreen1({ navigation, route }) {
  /**
   * ✅ RECEIVE from previous screen (SignupScreen)
   * Make sure SignupScreen navigates like:
   * navigation.navigate("Step1", { formData: { email, password, provider } })
   */
  const prevData = route?.params?.formData ?? {};

  // ✅ initialize inputs from prevData if user comes back
  const [name, setname] = useState(prevData.name || "");
  const [age, setAge] = useState(prevData.age ? String(prevData.age) : "");
  const [city, setCity] = useState(prevData.city || "");
  // ✅ profession is now a selected category string
  const [profession, setProfession] = useState(prevData.profession || "");

  const [nameFocused, setnameFocused] = useState(false);
  const [ageFocused, setAgeFocused] = useState(false);
  const [cityFocused, setCityFocused] = useState(false);

  // Animation refs
  const headerFadeAnim = useRef(new Animated.Value(0)).current;
  const headerSlideAnim = useRef(new Animated.Value(20)).current;
  const contentFadeAnim = useRef(new Animated.Value(0)).current;
  const footerFadeAnim = useRef(new Animated.Value(0)).current;
  const footerSlideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerFadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
      Animated.timing(headerSlideAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
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
    // ✅ MERGE: previous data (email/password/etc) + current step fields
    const nextFormData = {
      ...prevData,
      name: name.trim(),
      age: age.trim(), // keep string for now
      city: city.trim(),
      profession: profession, // already a clean category
    };

    console.log("✅ Step1 received formData:", prevData);
    console.log("✅ Step1 -> Step2 sending formData:", nextFormData);

    navigation.navigate("Step2", { formData: nextFormData });
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
              { opacity: headerFadeAnim, transform: [{ translateY: headerSlideAnim }] },
            ]}
          >
            <Text style={styles.title}>The Basics</Text>
            <Text style={styles.subtitle}>Just enough to coordinate. No bios, no last name</Text>
          </Animated.View>

          {/* Content */}
          <Animated.View style={[styles.content, { opacity: contentFadeAnim }]}>
            {/* First Name */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>First Name or Nickname</Text>
              <View style={[styles.inputContainer, nameFocused && styles.inputContainerFocused]}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="person-outline"
                    size={20}
                    color={nameFocused ? ORANGE : "#71717A"}
                  />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Alex"
                  placeholderTextColor="#52525B"
                  value={name}
                  onChangeText={setname}
                  onFocus={() => setnameFocused(true)}
                  onBlur={() => setnameFocused(false)}
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
                  <Ionicons name="calendar-outline" size={20} color={ageFocused ? ORANGE : "#71717A"} />
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
                  <Ionicons name="location-outline" size={20} color={cityFocused ? ORANGE : "#71717A"} />
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

            {/* ✅ Profession (Category Selector) */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Profession</Text>

              <View style={styles.professionGrid}>
                {PROFESSION_OPTIONS.map((option) => {
                  const selected = profession === option;

                  return (
                    <TouchableOpacity
                      key={option}
                      onPress={() => setProfession(option)}
                      activeOpacity={0.85}
                      style={[
                        styles.professionChip,
                        selected && styles.professionChipSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.professionChipText,
                          selected && styles.professionChipTextSelected,
                        ]}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Optional helper text */}
              <Text style={styles.professionHint}>
                Pick the closest category — you can refine later.
              </Text>
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
  scrollContent: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 32, paddingBottom: 24 },

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
  inputContainerFocused: { borderColor: ORANGE, backgroundColor: "rgba(39, 39, 42, 0.8)" },

  iconContainer: { marginRight: 12 },
  input: { flex: 1, fontSize: 16, color: "#FFFFFF", paddingVertical: 12, fontWeight: "600" },

  // ✅ Profession chips
  professionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  professionChip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: "rgba(39, 39, 42, 0.5)",
    borderWidth: 1,
    borderColor: "#27272A",
  },
  professionChipSelected: {
    backgroundColor: "rgba(255, 85, 0, 0.15)",
    borderColor: ORANGE,
  },
  professionChipText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#A1A1AA",
  },
  professionChipTextSelected: {
    color: ORANGE,
  },
  professionHint: {
    marginTop: 10,
    fontSize: 12,
    color: "#71717A",
    fontWeight: "600",
  },

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
