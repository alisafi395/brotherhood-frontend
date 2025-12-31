// screens/StepScreen2.js
import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const ORANGE = "#FF5500";

export default function StepScreen2({ navigation, route }) {
  // carry forward data from StepScreen1
  const prev = route?.params || {};
  const [selected, setSelected] = useState(prev.goals || []);

  // Animations
  const headerFadeAnim = useRef(new Animated.Value(0)).current;
  const headerSlideAnim = useRef(new Animated.Value(20)).current;
  const contentFadeAnim = useRef(new Animated.Value(0)).current;
  const footerFadeAnim = useRef(new Animated.Value(0)).current;
  const footerSlideAnim = useRef(new Animated.Value(20)).current;

  // Matches your MagicPatterns goal list but with Ionicons
  const goals = [
    { id: "strength", title: "Strength & Discipline", icon: "barbell-outline" },
    { id: "character", title: "Character Development", icon: "layers-outline" },
    { id: "wealth", title: "Wealth Building & Stability", icon: "cash-outline" },
    { id: "skill", title: "Skill Sharpening & Craft", icon: "build-outline" },
    { id: "power", title: "Social Power & Presence", icon: "people-outline" },
    { id: "mental", title: "Mental Strength & Balance", icon: "help-circle-outline" },
    { id: "ambition", title: "Ambition & High Performance", icon: "trending-up-outline" },
    { id: "exploration", title: "Exploration & Adventure", icon: "navigate-outline" },
  ];

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

  const toggleGoal = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else {
      if (selected.length < 5) setSelected([...selected, id]);
    }
  };

  // ✅ per your latest request: no checks to block navigation
  const goNext = () => {
    navigation.navigate("Step3", {
      ...prev,
      goals: selected,
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
          <Text style={styles.title}>Your Goals</Text>
          <Text style={styles.subtitle}>Select 3-5 action-based interests to power matching.</Text>
        </Animated.View>

        {/* Goals List */}
        <Animated.View style={[styles.scrollContainer, { opacity: contentFadeAnim }]}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                selected={selected.includes(goal.id)}
                onPress={() => toggleGoal(goal.id)}
              />
            ))}

            <View style={{ height: 8 }} />
          </ScrollView>
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
      </View>
    </SafeAreaView>
  );
}

function GoalCard({ goal, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.goalCard, selected && styles.goalCardSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, selected && styles.iconContainerSelected]}>
        <Ionicons name={goal.icon} size={20} color={selected ? ORANGE : "#71717A"} />
      </View>

      <Text style={[styles.goalTitle, selected && styles.goalTitleSelected]}>{goal.title}</Text>

      {selected ? (
        <View style={styles.checkmark}>
          <Ionicons name="checkmark" size={14} color="#000" />
        </View>
      ) : (
        <View style={styles.checkmarkGhost} />
      )}
    </TouchableOpacity>
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

  title: { fontSize: 32, fontWeight: "900", color: "#FFFFFF", marginBottom: 12 },

  subtitle: { fontSize: 16, color: "#A1A1AA", lineHeight: 24, fontWeight: "600" },

  scrollContainer: {
    flex: 1,
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },

  scrollView: { flex: 1 },

  scrollContent: { paddingBottom: 16, gap: 12 },

  goalCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(39, 39, 42, 0.5)",
    borderWidth: 1,
    borderColor: "#27272A",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },

  goalCardSelected: {
    backgroundColor: "rgba(255, 85, 0, 0.10)",
    borderColor: ORANGE,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#18181B",
    borderWidth: 1,
    borderColor: "#27272A",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  iconContainerSelected: {
    backgroundColor: "rgba(255, 85, 0, 0.15)",
    borderColor: ORANGE,
  },

  goalTitle: { flex: 1, fontSize: 16, fontWeight: "700", color: "#FFFFFF" },

  goalTitleSelected: { color: ORANGE },

  checkmark: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: ORANGE,
    alignItems: "center",
    justifyContent: "center",
  },

  checkmarkGhost: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#27272A",
  },

  footer: { paddingTop: 24 },

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
