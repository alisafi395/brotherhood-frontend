import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";

import HomeHeader from "../components/Home/HomeHeader";
import HomeQuickActions from "../components/Home/HomeQuickActions";
import RecentActivityCard from "../components/Home/RecentActivityCard";

export default function HomeScreen({ navigation }) {
  const recent = [
    { initials: "M1", title: "Member 1 joined the\ncommunity", time: "2 hours ago" },
    { initials: "M2", title: "Member 2 joined the\ncommunity", time: "2 hours ago" },
    { initials: "M3", title: "Member 3 joined the\ncommunity", time: "2 hours ago" },
  ];

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <HomeHeader />

        <HomeQuickActions
          onFindBrothers={() => navigation.navigate("FindBrothers")}
          onEvents={() => navigation.navigate("Events")}
          onMessages={() => navigation.navigate("Messages")}
          onAchievements={() => navigation.navigate("Achievements")}
        />

        <RecentActivityCard items={recent} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000" },
  container: { paddingHorizontal: 18, paddingTop: 8, paddingBottom: 30 },
});
