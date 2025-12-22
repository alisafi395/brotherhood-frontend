import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function ActionCard({ icon, label, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}
    >
      <View style={styles.iconCircle}>
        <Ionicons name={icon} size={26} color="#EA7B2B" />
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

export default function HomeQuickActions({
  onFindBrothers,
  onEvents,
  onMessages,
  onAchievements,
}) {
  return (
    <View style={styles.grid}>
      <ActionCard icon="people-outline" label="Find Brothers" onPress={onFindBrothers} />
      <ActionCard icon="calendar-outline" label="Events" onPress={onEvents} />
      <ActionCard icon="chatbubble-outline" label="Messages" onPress={onMessages} />
      <ActionCard icon="trophy-outline" label="Achievements" onPress={onAchievements} />
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 18,
  },
  card: {
    width: "47.5%",
    backgroundColor: "#141C2A",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    paddingVertical: 26,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(234, 123, 43, 0.12)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  label: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
});
