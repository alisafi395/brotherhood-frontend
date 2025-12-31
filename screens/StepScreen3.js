// screens/StepScreen3.js
import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const ORANGE = "#FF5500";

export default function StepScreen3({ navigation, route }) {
  const prev = route?.params || {};

  const [selectedBlocks, setSelectedBlocks] = useState(prev.timeBlocks || []);
  const [distance, setDistance] = useState(typeof prev.distance === "number" ? prev.distance : 10);

  // Animations
  const headerFadeAnim = useRef(new Animated.Value(0)).current;
  const headerSlideAnim = useRef(new Animated.Value(20)).current;
  const timeBlocksFadeAnim = useRef(new Animated.Value(0)).current;
  const distanceFadeAnim = useRef(new Animated.Value(0)).current;
  const footerFadeAnim = useRef(new Animated.Value(0)).current;
  const footerSlideAnim = useRef(new Animated.Value(20)).current;

  const timeBlocks = [
    { id: "weekday_am", title: "Weekday Mornings", icon: "cafe-outline" },
    { id: "weekday_pm", title: "Weekday Evenings", icon: "moon-outline" },
    { id: "weekend_am", title: "Weekend Mornings", icon: "sunny-outline" },
    { id: "weekend_pm", title: "Weekend Afternoons", icon: "partly-sunny-outline" },
  ];

  const distances = [5, 10, 20];

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

    Animated.timing(timeBlocksFadeAnim, {
      toValue: 1,
      duration: 400,
      delay: 200,
      useNativeDriver: true,
    }).start();

    Animated.timing(distanceFadeAnim, {
      toValue: 1,
      duration: 400,
      delay: 300,
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
  }, [
    headerFadeAnim,
    headerSlideAnim,
    timeBlocksFadeAnim,
    distanceFadeAnim,
    footerFadeAnim,
    footerSlideAnim,
  ]);

  const toggleBlock = (id) => {
    if (selectedBlocks.includes(id)) {
      setSelectedBlocks(selectedBlocks.filter((b) => b !== id));
    } else {
      setSelectedBlocks([...selectedBlocks, id]);
    }
  };

  // ✅ No blocking checks — always allow finishing
  const finish = () => {
    // Pass everything forward if you want it on Home, or go straight to Home.
    navigation.navigate("Step4", {
      ...prev,
      timeBlocks: selectedBlocks,
      distance,
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
          <Text style={styles.title}>Availability</Text>
          <Text style={styles.subtitle}>
            When and where can you meet? No calendars, just general blocks.
          </Text>
        </Animated.View>

        {/* Content */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Time Blocks */}
          <Animated.View style={[styles.section, { opacity: timeBlocksFadeAnim }]}>
            <Text style={styles.sectionTitle}>TIME BLOCKS</Text>

            <View style={styles.timeBlocksList}>
              {timeBlocks.map((block) => (
                <TimeBlockCard
                  key={block.id}
                  block={block}
                  selected={selectedBlocks.includes(block.id)}
                  onPress={() => toggleBlock(block.id)}
                />
              ))}
            </View>
          </Animated.View>

          {/* Distance */}
          <Animated.View style={[styles.section, { opacity: distanceFadeAnim }]}>
            <Text style={styles.sectionTitle}>TRAVEL DISTANCE</Text>

            <View style={styles.distanceCard}>
              <View style={styles.distanceButtons}>
                {distances.map((d) => (
                  <TouchableOpacity
                    key={d}
                    style={[styles.distanceButton, distance === d && styles.distanceButtonSelected]}
                    onPress={() => setDistance(d)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.distanceButtonText,
                        distance === d && styles.distanceButtonTextSelected,
                      ]}
                    >
                      {d}km
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.distanceDescription}>
                Willing to travel up to <Text style={styles.distanceValue}>{distance}km</Text> for
                meets.
              </Text>
            </View>
          </Animated.View>

          <View style={{ height: 8 }} />
        </ScrollView>

        {/* Footer */}
        <Animated.View
          style={[
            styles.footer,
            { opacity: footerFadeAnim, transform: [{ translateY: footerSlideAnim }] },
          ]}
        >
          <TouchableOpacity style={styles.finishButton} onPress={finish} activeOpacity={0.9}>
            <Text style={styles.finishButtonText}>Finish Setup</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

function TimeBlockCard({ block, selected, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.timeBlockCard, selected && styles.timeBlockCardSelected]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.timeBlockIcon, selected && styles.timeBlockIconSelected]}>
        <Ionicons name={block.icon} size={20} color={selected ? ORANGE : "#71717A"} />
      </View>

      <Text style={[styles.timeBlockTitle, selected && styles.timeBlockTitleSelected]}>
        {block.title}
      </Text>

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

  scrollView: {
    flex: 1,
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },

  scrollContent: { paddingBottom: 16 },

  section: { marginBottom: 32 },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#A1A1AA",
    letterSpacing: 1.2,
    marginBottom: 12,
  },

  timeBlocksList: { gap: 12 },

  timeBlockCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(39, 39, 42, 0.5)",
    borderWidth: 1,
    borderColor: "#27272A",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },

  timeBlockCardSelected: {
    backgroundColor: "rgba(255, 85, 0, 0.10)",
    borderColor: ORANGE,
  },

  timeBlockIcon: {
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

  timeBlockIconSelected: {
    backgroundColor: "rgba(255, 85, 0, 0.15)",
    borderColor: ORANGE,
  },

  timeBlockTitle: { flex: 1, fontSize: 16, fontWeight: "700", color: "#FFFFFF" },

  timeBlockTitleSelected: { color: ORANGE },

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

  distanceCard: {
    backgroundColor: "rgba(39, 39, 42, 0.5)",
    borderWidth: 1,
    borderColor: "#27272A",
    borderRadius: 12,
    padding: 24,
  },

  distanceButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  distanceButton: {
    width: 64,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#27272A",
    alignItems: "center",
    justifyContent: "center",
  },

  distanceButtonSelected: { backgroundColor: ORANGE },

  distanceButtonText: { fontSize: 14, fontWeight: "700", color: "#A1A1AA" },

  distanceButtonTextSelected: { color: "#FFFFFF" },

  distanceDescription: {
    textAlign: "center",
    fontSize: 14,
    color: "#A1A1AA",
    lineHeight: 20,
    fontWeight: "600",
  },

  distanceValue: { fontWeight: "900", color: "#FFFFFF" },

  footer: { paddingTop: 24 },

  finishButton: {
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

  finishButtonText: { fontSize: 16, fontWeight: "800", color: "#FFFFFF" },
});
