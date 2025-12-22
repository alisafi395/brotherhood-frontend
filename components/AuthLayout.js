import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AuthLayout({ children }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.logoCircle}>
          <Ionicons name="person" size={30} color="#fff" />
          <View style={styles.smallCircle} />
        </View>
        <Text style={styles.brand}>Brotherhood</Text>
      </View>

      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000" },

  header: {
    marginTop: 22,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },

  logoCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#F1872A",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  smallCircle: {
    position: "absolute",
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#F1872A",
    borderWidth: 3,
    borderColor: "#fff",
    top: 14,
    right: 12,
  },

  brand: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "800",
  },
});
