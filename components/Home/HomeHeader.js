import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HomeHeader() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Welcome to{"\n"}Brotherhood</Text>
      <Text style={styles.sub}>Connect, grow, and thrive together</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginTop: 14, marginBottom: 18 },
  title: {
    color: "#fff",
    fontSize: 42,
    fontWeight: "900",
    lineHeight: 46,
  },
  sub: {
    marginTop: 10,
    color: "rgba(255,255,255,0.55)",
    fontSize: 16,
    fontWeight: "600",
  },
});
