// screens/StepScreen1.js
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function StepScreen1({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [ageText, setAgeText] = useState(""); // user can type
  const [profession, setProfession] = useState("");
  const [about, setAbout] = useState("");

  const MIN_AGE = 16;
  const MAX_AGE = 80;

  const clampAge = (n) => Math.min(MAX_AGE, Math.max(MIN_AGE, n));

  const parsedAge = (() => {
    const n = parseInt(ageText, 10);
    return Number.isFinite(n) ? n : null;
  })();

  const incAge = () => {
    const base = parsedAge ?? MIN_AGE;
    setAgeText(String(clampAge(base + 1)));
  };

  const decAge = () => {
    const base = parsedAge ?? MIN_AGE;
    setAgeText(String(clampAge(base - 1)));
  };

  const onChangeAge = (t) => {
    const digits = t.replace(/[^\d]/g, "");
    if (digits === "") return setAgeText("");
    const n = clampAge(parseInt(digits, 10));
    setAgeText(String(n));
  };

  const canContinue =
    fullName.trim().length > 0 && !!parsedAge && profession.trim().length > 0;

  const goNext = () => {
    navigation.navigate("Step2", {
      profile: { fullName, age: parsedAge, profession, about },
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.logoCircle}>
            <Ionicons name="person" size={18} color="#fff" />
            <Ionicons
              name="person-outline"
              size={18}
              color="#fff"
              style={{ marginLeft: -6, opacity: 0.9 }}
            />
          </View>
          <Text style={styles.brand}>Brotherhood</Text>
        </View>

        {/* Progress */}
        <View style={styles.progressRow}>
          <View style={[styles.progressBar, styles.progressActive]} />
          <View style={styles.progressBar} />
          <View style={styles.progressBar} />
        </View>

        {/* Title */}
        <Text style={styles.title}>Tell us about yourself</Text>
        <Text style={styles.subtitle}>
          Help us personalize your Brotherhood experience
        </Text>

        {/* Inputs */}
        <View style={styles.form}>
          {/* Full Name */}
          <View style={styles.inputWrap}>
            <Ionicons name="person-outline" size={20} color={vars.icon} />
            <TextInput
              value={fullName}
              onChangeText={setFullName}
              placeholder="Full Name"
              placeholderTextColor={vars.placeholder}
              style={styles.input}
              autoCapitalize="words"
              returnKeyType="next"
            />
          </View>

          {/* Age: type or stepper */}
          <View style={styles.inputWrap}>
            <Ionicons name="calendar-outline" size={20} color={vars.icon} />
            <TextInput
              value={ageText}
              onChangeText={onChangeAge}
              placeholder="Age"
              placeholderTextColor={vars.placeholder}
              style={styles.input}
              keyboardType="number-pad"
              returnKeyType="next"
              maxLength={2}
            />
            <View style={styles.stepper}>
              <Pressable onPress={incAge} hitSlop={10} style={styles.stepperBtn}>
                <Ionicons name="chevron-up" size={18} color={vars.icon} />
              </Pressable>
              <Pressable onPress={decAge} hitSlop={10} style={styles.stepperBtn}>
                <Ionicons name="chevron-down" size={18} color={vars.icon} />
              </Pressable>
            </View>
          </View>

          {/* Profession */}
          <View style={styles.inputWrap}>
            <Ionicons name="briefcase-outline" size={20} color={vars.icon} />
            <TextInput
              value={profession}
              onChangeText={setProfession}
              placeholder="Profession"
              placeholderTextColor={vars.placeholder}
              style={styles.input}
              returnKeyType="next"
            />
          </View>

          {/* About */}
          <View style={[styles.inputWrap, styles.textAreaWrap]}>
            <Ionicons
              name="document-text-outline"
              size={20}
              color={vars.icon}
              style={{ marginTop: 2 }}
            />
            <TextInput
              value={about}
              onChangeText={setAbout}
              placeholder="Tell us a bit about yourself..."
              placeholderTextColor={vars.placeholder}
              style={[styles.input, styles.textArea]}
              multiline
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Continue */}
        <Pressable
          onPress={goNext}
          disabled={!canContinue}
          style={({ pressed }) => [
            styles.cta,
            (!canContinue || pressed) && { opacity: !canContinue ? 0.5 : 0.85 },
          ]}
        >
          <Text style={styles.ctaText}>Continue</Text>
        </Pressable>

        {/* Skip */}
        <Pressable onPress={goNext} style={styles.skipBtn}>
          <Text style={styles.skipText}>Skip for now</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const vars = {
  bg: "#000000",
  card: "#1b2433",
  cardStroke: "rgba(255,255,255,0.10)",
  placeholder: "rgba(255,255,255,0.35)",
  text: "rgba(255,255,255,0.90)",
  sub: "rgba(255,255,255,0.55)",
  icon: "rgba(255,255,255,0.55)",
  orange: "#EA7B2B",
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: vars.bg },
  container: {
    flex: 1,
    backgroundColor: vars.bg,
    paddingHorizontal: 22,
    paddingTop: 12,
  },

  headerRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  logoCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: vars.orange,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  brand: { color: "#fff", fontSize: 26, fontWeight: "800", letterSpacing: 0.2 },

  progressRow: {
    flexDirection: "row",
    gap: 18,
    marginTop: 18,
    marginBottom: 22,
  },
  progressBar: {
    height: 6,
    flex: 1,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.20)",
  },
  progressActive: { backgroundColor: vars.orange },

  title: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "800",
    marginTop: 4,
    lineHeight: 40,
  },
  subtitle: {
    color: vars.sub,
    fontSize: 16,
    marginTop: 10,
    marginBottom: 24,
  },

  form: { gap: 16 },

  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: vars.card,
    borderWidth: 1,
    borderColor: vars.cardStroke,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: Platform.select({ ios: 16, android: 14 }),
  },
  input: {
    flex: 1,
    color: vars.text,
    fontSize: 16,
  },

  stepper: {
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
  },
  stepperBtn: {
    paddingHorizontal: 2,
    paddingVertical: 2,
  },

  textAreaWrap: {
    borderRadius: 26,
    alignItems: "flex-start",
    paddingTop: 16,
    paddingBottom: 16,
  },
  textArea: { minHeight: 110 },

  cta: {
    marginTop: 26,
    backgroundColor: vars.orange,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: { color: "#fff", fontSize: 18, fontWeight: "800" },

  skipBtn: { paddingVertical: 14, alignItems: "center" },
  skipText: { color: "rgba(255,255,255,0.55)", fontSize: 16, fontWeight: "600" },
});
