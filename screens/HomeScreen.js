// screens/HomeScreen.js
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

import Nav from "../components/Nav";
import { useUser } from "../context/UserContext";

// Timer Component
function Timer({ expiryTime, size = "sm" }) {
  const [timeLeft, setTimeLeft] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +expiryTime - +new Date();
      if (difference > 0) {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft(
          `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
            2,
            "0"
          )}:${String(seconds).padStart(2, "0")}`
        );
        setIsUrgent(hours < 6);
      } else {
        setTimeLeft("Expired");
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [expiryTime]);

  return (
    <Text
      style={[
        styles.timerText,
        size === "sm" && styles.timerTextSm,
        isUrgent && styles.timerTextUrgent,
      ]}
    >
      {timeLeft}
    </Text>
  );
}

// MeetCard Component
function MeetCard({ meet, onPress }) {
  return (
    <TouchableOpacity style={styles.meetCard} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.meetCardHeader}>
        <Text style={styles.meetCardTitle} numberOfLines={1}>
          {meet.activity}
        </Text>
        <View style={styles.meetCardBadge}>
          <Text style={styles.meetCardBadgeText}>Upcoming</Text>
        </View>
      </View>

      <View style={styles.meetCardDetails}>
        <View style={styles.meetCardDetailRow}>
          <Ionicons name="calendar-outline" size={wp("3.6%")} color="#A1A1AA" />
          <Text style={styles.meetCardDetailText}>
            {meet.date} • {meet.time}
          </Text>
        </View>
        <View style={styles.meetCardDetailRow}>
          <Ionicons name="location-outline" size={wp("3.6%")} color="#A1A1AA" />
          <Text style={styles.meetCardDetailText} numberOfLines={1}>
            {meet.location}
          </Text>
        </View>
      </View>

      <View style={styles.meetCardFooter}>
        <View style={styles.attendeesList}>
          {meet.attendees.map((attendee, index) => (
            <View
              key={attendee.id}
              style={[styles.attendeeAvatar, index > 0 && { marginLeft: wp("-2%") }]}
            >
              <Text style={styles.attendeeInitial}>
                {attendee.name.charAt(0)}
              </Text>

              {attendee.verified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={wp("3.2%")} color="#FF5500" />
                </View>
              )}
            </View>
          ))}
        </View>

        <Text style={styles.attendeeCount}>{meet.attendees.length} attending</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function HomeScreen({ navigation }) {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [currentTab, setCurrentTab] = useState("home");
  const { user } = useUser();

  // Mock data
  const activeChats = [
    {
      id: 1,
      name: "Gym Squad",
      expiry: new Date(Date.now() + 1000 * 60 * 60 * 48),
      members: 3,
    },
    {
      id: 2,
      name: "Coffee Crew",
      expiry: new Date(Date.now() + 1000 * 60 * 60 * 5),
      members: 3,
    },
  ];

  const upcomingMeets = [
    {
      id: "1",
      activity: "Morning Lifting",
      location: "Gold's Gym Venice",
      time: "07:00 AM",
      date: "Tomorrow",
      attendees: [
        { id: "1", name: "Alex", verified: true },
        { id: "2", name: "Mike", verified: true },
        { id: "3", name: "Sam", verified: true },
      ],
    },
    {
      id: "2",
      activity: "Weekend Hike",
      location: "Runyon Canyon",
      time: "09:00 AM",
      date: "Sat, Jun 15",
      attendees: [
        { id: "1", name: "Alex", verified: true },
        { id: "4", name: "John", verified: true },
        { id: "5", name: "Dave", verified: true },
      ],
    },
  ];

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pulseAnim]);

  const handleTabChange = (tab) => {
    setCurrentTab(tab);

    if (tab === "threads") navigation.navigate("Threads");
    if (tab === "chats") navigation.navigate("Chats");
    if (tab === "meets") navigation.navigate("Meets");
    if (tab === "home") navigation.navigate("Home");
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top", "left", "right"]}>
      <View style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <View style={{ maxWidth: "75%" }}>
              <Text style={styles.headerTitle}>Dashboard</Text>
              <Text style={styles.headerSubtitle} numberOfLines={1}>
                {user?.name || "Guest"}
              </Text>
            </View>

            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {(user?.name?.[0] || "A").toUpperCase()}
              </Text>
            </View>
          </View>

          {/* Matching Status */}
          <View style={styles.section}>
            <View style={styles.matchingCard}>
              <View style={styles.matchingGlow} />

              <View style={styles.matchingHeader}>
                <View style={{ maxWidth: "80%" }}>
                  <Text style={styles.matchingTitle}>Matching Active</Text>
                  <Text style={styles.matchingSubtitle} numberOfLines={1}>
                    Searching for your squad...
                  </Text>
                </View>

                <View style={styles.pulseContainer}>
                  <Animated.View
                    style={[
                      styles.pulseOuter,
                      {
                        transform: [{ scale: pulseAnim }],
                        opacity: pulseAnim.interpolate({
                          inputRange: [1, 1.5],
                          outputRange: [0.75, 0],
                        }),
                      },
                    ]}
                  />
                  <View style={styles.pulseInner} />
                </View>
              </View>

              <View style={styles.interestTags}>
                <View style={styles.interestTag}>
                  <Text style={styles.interestTagText}>Gym</Text>
                </View>
                <View style={styles.interestTag}>
                  <Text style={styles.interestTagText}>Hiking</Text>
                </View>
                <View style={styles.interestTag}>
                  <Text style={styles.interestTagText}>Coffee</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.viewCriteriaButton} activeOpacity={0.8}>
                <Text style={styles.viewCriteriaButtonText}>View Criteria</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Active Chats */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Active Chats</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Chats")} activeOpacity={0.8}>
                <Text style={styles.viewAllButton}>View All</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.chatsList}>
              {activeChats.map((chat) => (
                <TouchableOpacity
                  key={chat.id}
                  style={styles.chatCard}
                  onPress={() => navigation.navigate("Chats")}
                  activeOpacity={0.8}
                >
                  <View style={styles.chatCardLeft}>
                    <View style={styles.chatIcon}>
                      <Ionicons name="people-outline" size={wp("4.5%")} color="#71717A" />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={styles.chatName} numberOfLines={1}>
                        {chat.name}
                      </Text>
                      <Text style={styles.chatMembers}>{chat.members} members</Text>
                    </View>
                  </View>

                  <Timer expiryTime={chat.expiry} size="sm" />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Upcoming Meets */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Meets</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Meets")} activeOpacity={0.8}>
                <Text style={styles.viewAllButton}>View All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.meetsScroll}
            >
              {upcomingMeets.map((meet) => (
                <MeetCard key={meet.id} meet={meet} onPress={() => navigation.navigate("Meets")} />
              ))}
            </ScrollView>
          </View>

          {/* give space so content doesn't hide behind BottomNav */}
          <View style={{ height: hp("10%") }} />
        </ScrollView>

        {/* Bottom Nav */}
        <Nav
          currentTab={currentTab}
          onTabChange={handleTabChange}
          chatBadgeCount={2}
          meetBadgeCount={1}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#000000" },

  container: { flex: 1, backgroundColor: "#000000" },
  scrollView: { flex: 1 },
  scrollContent: {
    paddingHorizontal: wp("6%"),
    paddingTop: hp("2%"),
    paddingBottom: hp("2%"),
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("3%"),
  },
  headerTitle: {
    fontSize: wp("6.2%"),
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: hp("0.4%"),
  },
  headerSubtitle: { fontSize: wp("3.6%"), color: "#A1A1AA" },

  avatar: {
    width: wp("11%"),
    height: wp("11%"),
    borderRadius: wp("11%") / 2,
    backgroundColor: "#27272A",
    borderWidth: 1,
    borderColor: "#3F3F46",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { fontSize: wp("4.2%"), fontWeight: "bold", color: "#FF5500" },

  section: { marginBottom: hp("3%") },

  matchingCard: {
    backgroundColor: "rgba(39, 39, 42, 0.5)",
    borderWidth: 1,
    borderColor: "#27272A",
    borderRadius: wp("4%"),
    padding: wp("5%"),
    position: "relative",
    overflow: "hidden",
  },
  matchingGlow: {
    position: "absolute",
    top: hp("-4%"),
    right: wp("-8%"),
    width: wp("32%"),
    height: wp("32%"),
    backgroundColor: "rgba(255, 85, 0, 0.05)",
    borderRadius: wp("32%") / 2,
  },
  matchingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: hp("2%"),
    zIndex: 10,
  },
  matchingTitle: {
    fontSize: wp("4.8%"),
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: hp("0.4%"),
  },
  matchingSubtitle: { fontSize: wp("3.6%"), color: "#A1A1AA" },

  pulseContainer: { position: "relative", width: wp("3.2%"), height: wp("3.2%") },
  pulseOuter: {
    position: "absolute",
    width: wp("3.2%"),
    height: wp("3.2%"),
    borderRadius: wp("3.2%") / 2,
    backgroundColor: "#FF5500",
  },
  pulseInner: {
    position: "absolute",
    width: wp("3.2%"),
    height: wp("3.2%"),
    borderRadius: wp("3.2%") / 2,
    backgroundColor: "#FF5500",
    zIndex: 10,
  },

  interestTags: { flexDirection: "row", gap: wp("2%"), marginBottom: hp("2%") },
  interestTag: {
    paddingHorizontal: wp("2.2%"),
    paddingVertical: hp("0.5%"),
    backgroundColor: "#27272A",
    borderRadius: wp("1.2%"),
  },
  interestTagText: { fontSize: wp("3%"), color: "#D4D4D8" },

  viewCriteriaButton: {
    borderWidth: 1,
    borderColor: "#FFFFFF",
    borderRadius: wp("2%"),
    paddingVertical: hp("1.2%"),
    alignItems: "center",
  },
  viewCriteriaButtonText: {
    fontSize: wp("3.6%"),
    fontWeight: "600",
    color: "#FFFFFF",
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp("1.6%"),
  },
  sectionTitle: { fontSize: wp("4.8%"), fontWeight: "bold", color: "#FFFFFF" },
  viewAllButton: { fontSize: wp("3.6%"), fontWeight: "500", color: "#FF5500" },

  chatsList: { gap: hp("1.4%") },
  chatCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#18181B",
    borderWidth: 1,
    borderColor: "#27272A",
    padding: wp("4%"),
    borderRadius: wp("3%"),
  },
  chatCardLeft: { flexDirection: "row", alignItems: "center", gap: wp("3%"), flex: 1 },
  chatIcon: {
    width: wp("11%"),
    height: wp("11%"),
    borderRadius: wp("11%") / 2,
    backgroundColor: "#27272A",
    alignItems: "center",
    justifyContent: "center",
  },
  chatName: { fontSize: wp("3.6%"), fontWeight: "bold", color: "#FFFFFF", marginBottom: hp("0.2%") },
  chatMembers: { fontSize: wp("3.1%"), color: "#71717A" },

  timerText: {
    fontSize: wp("3.6%"),
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    color: "#A1A1AA",
  },
  timerTextSm: { fontSize: wp("3.2%") },
  timerTextUrgent: { color: "#FF5500" },

  meetsScroll: { gap: wp("4%"), paddingRight: wp("6%") },
  meetCard: {
    backgroundColor: "#18181B",
    borderWidth: 1,
    borderColor: "#27272A",
    borderRadius: wp("3%"),
    padding: wp("4%"),
    width: wp("72%"),
  },
  meetCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: hp("1.4%"),
    gap: wp("2%"),
  },
  meetCardTitle: { fontSize: wp("4.6%"), fontWeight: "bold", color: "#FFFFFF", flex: 1 },
  meetCardBadge: {
    backgroundColor: "rgba(255, 85, 0, 0.1)",
    paddingHorizontal: wp("2.2%"),
    paddingVertical: hp("0.3%"),
    borderRadius: wp("1.2%"),
  },
  meetCardBadgeText: { fontSize: wp("3%"), fontWeight: "500", color: "#FF5500" },

  meetCardDetails: { gap: hp("1%"), marginBottom: hp("1.8%") },
  meetCardDetailRow: { flexDirection: "row", alignItems: "center", gap: wp("2%") },
  meetCardDetailText: { fontSize: wp("3.4%"), color: "#A1A1AA", flex: 1 },

  meetCardFooter: { flexDirection: "row", alignItems: "center", gap: wp("2%") },
  attendeesList: { flexDirection: "row" },
  attendeeAvatar: {
    width: wp("8.5%"),
    height: wp("8.5%"),
    borderRadius: wp("8.5%") / 2,
    backgroundColor: "#27272A",
    borderWidth: 2,
    borderColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  attendeeInitial: { fontSize: wp("3%"), fontWeight: "bold", color: "#FFFFFF" },
  verifiedBadge: {
    position: "absolute",
    bottom: hp("-0.2%"),
    right: wp("-0.8%"),
    backgroundColor: "#000000",
    borderRadius: wp("2%"),
    padding: wp("0.4%"),
  },
  attendeeCount: { fontSize: wp("3.1%"), color: "#71717A", marginLeft: wp("2%") },
});
