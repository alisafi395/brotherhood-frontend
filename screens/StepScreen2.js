// screens/StepScreen2.js
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  ScrollView,
} from "react-native";

export default function StepScreen2({ navigation, route }) {
  // Data from StepScreen1 (passed via navigation params)
  const { fullName, age, profession, about } = route.params || {};

  // Mix of long + short labels (at least 3 long)
  const interests = useMemo(
    () => [
      "Entrepreneurship",
      "Personal Development",
      "Content Creation",
      "Fitness",
      "Business",
      "Technology",
      "Sports",
      "Music",
      "Travel",
      "Reading",
      "Gaming",
      "Cooking",
      "Photography",
      "Art",
      "Finance",
      "Health",
      "Fashion",
      "Networking",
      "Meditation",
      "Outdoors",
      "Movies",
      "Podcasts",
    ],
    []
  );

  const [selected, setSelected] = useState([]);

  const toggleInterest = (item) => {
    setSelected((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const canContinue = selected.length >= 3;

  const goNext = () => {
    if (!canContinue) {
      Alert.alert("Pick at least 3", "Select at least 3 interests to continue.");
      return;
    }

    // Change this route name to your real next step / home route
    navigation.navigate("Step3", {
      fullName,
      age,
      profession,
      about,
      interests: selected,
    });
  };

  const skip = () => {
    navigation.navigate("Home", {
      fullName,
      age,
      profession,
      about,
      interests: [],
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />

      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.logoCircle} />
          <Text style={styles.brand}>Brotherhood</Text>
        </View>

        {/* Progress */}
        <View style={styles.progressRow}>
          <View style={[styles.progressBar, styles.progressActive]} />
          <View style={[styles.progressBar, styles.progressActive]} />
          <View style={styles.progressBar} />
        </View>

        {/* Content (scrollable) */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>What are your interests?</Text>
          <Text style={styles.subtitle}>
            Select at least 3 to connect with like-minded brothers
          </Text>

          {/* Chips */}
          <View style={styles.chipsWrap}>
            {interests.map((item) => {
              const isOn = selected.includes(item);
              const isLong = item.length >= 12;

              // Long chips get more minimum width so 3 long ones can sit in a row.
              // Short chips get smaller min width so up to ~4 can sit in a row.
              const chipSizing = isLong ? styles.chipLong : styles.chipShort;

              return (
                <Pressable
                  key={item}
                  onPress={() => toggleInterest(item)}
                  style={({ pressed }) => [
                    styles.chip,
                    chipSizing,
                    isOn && styles.chipActive,
                    pressed && { opacity: 0.9 },
                  ]}
                >
                  <Text style={[styles.chipText, isOn && styles.chipTextActive]}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        {/* Bottom actions (sticky) */}
        <View style={styles.bottom}>
          <Pressable
            onPress={goNext}
            style={({ pressed }) => [
              styles.cta,
              (!canContinue || pressed) && { opacity: !canContinue ? 0.55 : 0.85 },
            ]}
          >
            <Text style={styles.ctaText}>Continue</Text>
          </Pressable>

          <Pressable onPress={skip} style={styles.skipBtn}>
            <Text style={styles.skipText}>Skip for now</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const vars = {
  bg: "#000000",
  card: "#1b2433",
  cardStroke: "rgba(255,255,255,0.10)",
  text: "rgba(255,255,255,0.90)",
  sub: "rgba(255,255,255,0.55)",
  chipText: "rgba(255,255,255,0.80)",
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
  },
  brand: { color: "#fff", fontSize: 26, fontWeight: "800", letterSpacing: 0.2 },

  progressRow: { flexDirection: "row", gap: 18, marginTop: 18, marginBottom: 18 },
  progressBar: {
    height: 6,
    flex: 1,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.20)",
  },
  progressActive: { backgroundColor: vars.orange },

  scrollContent: {
    paddingBottom: 18,
  },

  title: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 38,
    marginTop: 6,
  },
  subtitle: { color: vars.sub, fontSize: 16, marginTop: 10, marginBottom: 18 },

  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 8,
  },

  chip: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 999,
    backgroundColor: vars.card,
    borderWidth: 1,
    borderColor: vars.cardStroke,
    alignItems: "center",
    justifyContent: "center",
  },

  // ---- sizing rules to influence wrapping ----
  // Long labels: aim for 3 per row (roughly)
  chipLong: {
    minWidth: "31%", // 3-ish across with gaps on typical phones
  },
  // Short labels: aim for 4 per row (roughly)
  chipShort: {
    minWidth: "22%", // 4-ish across with gaps on typical phones
  },

  chipActive: {
    backgroundColor: "rgba(234, 123, 43, 0.18)",
    borderColor: "rgba(234, 123, 43, 0.55)",
  },
  chipText: { color: vars.chipText, fontSize: 16, fontWeight: "700" },
  chipTextActive: { color: "#fff" },

  bottom: {
    paddingTop: 10,
    paddingBottom: 6,
    backgroundColor: vars.bg,
  },

  cta: {
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
