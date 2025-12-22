import React from "react";
import { View, Text, StyleSheet } from "react-native";

function ActivityRow({ initials, title, time }) {
  return (
    <View style={styles.row}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowTime}>{time}</Text>
      </View>
    </View>
  );
}

export default function RecentActivityCard({ items = [] }) {
  return (
    <View style={styles.card}>
      <Text style={styles.heading}>Recent Activity</Text>

      <View style={styles.list}>
        {items.map((it, idx) => (
          <View key={`${it.initials}-${idx}`}>
            <ActivityRow initials={it.initials} title={it.title} time={it.time} />
            {idx !== items.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#141C2A",
    borderRadius: 26,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    padding: 18,
    paddingTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
    marginBottom: 18,
  },
  heading: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 14,
  },

  list: { gap: 14 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 6,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#EA7B2B",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontSize: 16, fontWeight: "900" },

  rowTitle: { color: "#fff", fontSize: 18, fontWeight: "800" },
  rowTime: { marginTop: 6, color: "rgba(255,255,255,0.45)", fontSize: 14, fontWeight: "700" },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginLeft: 66,
  },
});
