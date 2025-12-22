import React from "react";
import { View, StyleSheet } from "react-native";

export default function AuthCard({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginHorizontal: 18,
    marginBottom: 18,
    backgroundColor: "#0C1320",
    borderRadius: 34,
    paddingHorizontal: 18,
    paddingTop: 26,
    paddingBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
});
