// screens/StepScreen3.js
import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
  Platform,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function StepScreen3({ navigation, route }) {
  const {
    fullName,
    age,
    profession,
    about,
    interests = [],
  } = route?.params || {};

  const [idImage, setIdImage] = useState(null);

  const payload = useMemo(
    () => ({
      fullName,
      age,
      profession,
      about,
      interests,
      governmentIdUri: idImage?.uri || null,
    }),
    [fullName, age, profession, about, interests, idImage]
  );

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Camera permission is required to take a photo."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: false,
    });

    if (!result.canceled) {
      setIdImage(result.assets[0]);
    }
  };

  const completeSetup = () => {
   

    // 🔴 IMPORTANT: replace "Home" with your real route name
    navigation.navigate("Home", payload);
  };

  const doLater = () => {
    navigation.navigate("Home", payload);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.headerTop}>
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
          <View style={[styles.progressBar, styles.progressActive]} />
          <View style={[styles.progressBar, styles.progressActive]} />
        </View>

        {/* Title */}
        <Text style={styles.title}>Verify your identity</Text>
        <Text style={styles.subtitle}>
          Help us keep the community safe and authentic
        </Text>

        {/* Info card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.shieldWrap}>
              <Ionicons
                name="shield-checkmark-outline"
                size={22}
                color={vars.orange}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Why we verify</Text>
              <Text style={styles.cardSub}>
                To ensure a trusted community
              </Text>
            </View>
          </View>

          <View style={styles.bullets}>
            <Text style={styles.bullet}>• Your ID is encrypted and secure</Text>
            <Text style={styles.bullet}>
              • We only verify your identity, not store details
            </Text>
            <Text style={styles.bullet}>• Verified members get a badge</Text>
          </View>
        </View>

        {/* Upload / Camera */}
        <Pressable
          onPress={openCamera}
          style={[
            styles.uploadBox,
            idImage && styles.uploadBoxPicked,
          ]}
        >
          {idImage ? (
            <Image source={{ uri: idImage.uri }} style={styles.preview} />
          ) : (
            <>
              <View style={styles.uploadIconCircle}>
                <Ionicons
                  name="camera-outline"
                  size={28}
                  color="rgba(255,255,255,0.75)"
                />
              </View>
              <Text style={styles.uploadTitle}>Upload Government ID</Text>
              <Text style={styles.uploadSub}>
                Driver's license, passport, or national ID
              </Text>
            </>
          )}
        </Pressable>

        {/* Complete */}
        <Pressable
          onPress={completeSetup}
          style={({ pressed }) => [
            styles.cta,
            pressed && { opacity: 0.85 },
          ]}
        >
          <Text style={styles.ctaText}>Complete Setup</Text>
        </Pressable>

        {/* Later */}
        <Pressable onPress={doLater} style={styles.laterBtn}>
          <Text style={styles.laterText}>I'll do this later</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const vars = {
  bg: "#000",
  card: "#1b2433",
  cardStroke: "rgba(255,255,255,0.1)",
  orange: "#EA7B2B",
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: vars.bg },
  container: { flex: 1, paddingHorizontal: 22, paddingTop: 12 },

  headerTop: { alignItems: "center", gap: 10 },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: vars.orange,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  brand: { color: "#fff", fontSize: 28, fontWeight: "800" },

  progressRow: { flexDirection: "row", gap: 14, marginVertical: 22 },
  progressBar: {
    height: 6,
    flex: 1,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  progressActive: { backgroundColor: vars.orange },

  title: { color: "#fff", fontSize: 36, fontWeight: "800" },
  subtitle: { color: "rgba(255,255,255,0.55)", fontSize: 16, marginTop: 8 },

  card: {
    marginTop: 22,
    backgroundColor: vars.card,
    borderRadius: 26,
    padding: 18,
    borderWidth: 1,
    borderColor: vars.cardStroke,
  },

  cardHeader: { flexDirection: "row", gap: 14 },
  shieldWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "rgba(234,123,43,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },

  cardTitle: { color: "#fff", fontSize: 20, fontWeight: "800" },
  cardSub: { color: "rgba(255,255,255,0.55)", marginTop: 2 },

  bullets: { marginTop: 14, gap: 8 },
  bullet: { color: "rgba(255,255,255,0.75)", fontSize: 16 },

  uploadBox: {
    marginTop: 22,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "rgba(255,255,255,0.2)",
    borderRadius: 26,
    paddingVertical: 34,
    alignItems: "center",
  },
  uploadBoxPicked: {
    borderColor: "rgba(234,123,43,0.7)",
    backgroundColor: "rgba(234,123,43,0.1)",
  },

  uploadIconCircle: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: "rgba(255,255,255,0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  uploadTitle: { color: "#fff", fontSize: 22, fontWeight: "800" },
  uploadSub: { color: "rgba(255,255,255,0.55)", fontSize: 16, marginTop: 6 },

  preview: {
    width: "90%",
    height: 180,
    borderRadius: 18,
  },

  cta: {
    marginTop: "auto",
    backgroundColor: vars.orange,
    borderRadius: 999,
    paddingVertical: Platform.select({ ios: 16, android: 15 }),
    alignItems: "center",
  },
  ctaText: { color: "#fff", fontSize: 18, fontWeight: "800" },

  laterBtn: { paddingVertical: 14, alignItems: "center" },
  laterText: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 16,
    fontWeight: "700",
  },
});
