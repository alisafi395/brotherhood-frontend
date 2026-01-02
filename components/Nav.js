// components/BottomNav.js
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import Svg, { Path, Rect, Circle } from "react-native-svg";

// Icon Components
const HomeIcon = ({ size = 24, color = "#71717A", strokeWidth = 2 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
    <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <Path d="M9 22V12h6v10" />
  </Svg>
);

const MessageSquareIcon = ({ size = 24, color = "#71717A", strokeWidth = 2 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
    <Path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </Svg>
);

const UsersIcon = ({ size = 24, color = "#71717A", strokeWidth = 2 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
    <Path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <Circle cx="9" cy="7" r="4" />
    <Path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <Path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </Svg>
);

const CalendarIcon = ({ size = 24, color = "#71717A", strokeWidth = 2 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}>
    <Path d="M8 2v4M16 2v4M3 10h18" />
    <Rect x="3" y="4" width="18" height="18" rx="2" />
  </Svg>
);

/**
 * BottomNav Component
 * Props:
 * - currentTab: "home" | "threads" | "chats" | "meets"
 * - onTabChange: (tab) => void
 * - chatBadgeCount?: number
 * - meetBadgeCount?: number
 */
export default function Nav({
  currentTab,
  onTabChange,
  chatBadgeCount = 0,
  meetBadgeCount = 0,
}) {
  const tabs = [
    { id: "home", Icon: HomeIcon, label: "Home", badge: 0 },
    { id: "threads", Icon: MessageSquareIcon, label: "Threads", badge: 0 },
    { id: "chats", Icon: UsersIcon, label: "Chats", badge: chatBadgeCount },
    { id: "meets", Icon: CalendarIcon, label: "Meets", badge: meetBadgeCount },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navContent}>
        {tabs.map((tab) => {
          const isActive = currentTab === tab.id;

          return (
            <TouchableOpacity
              key={tab.id}
              style={styles.tabButton}
              onPress={() => onTabChange(tab.id)}
              activeOpacity={0.7}
            >
              <View style={styles.iconContainer}>
                <tab.Icon
                  size={24}
                  color={isActive ? "#FF5500" : "#71717A"}
                  strokeWidth={isActive ? 2.5 : 2}
                />

                {tab.badge > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>
                      {tab.badge > 99 ? "99+" : String(tab.badge)}
                    </Text>
                  </View>
                )}
              </View>

              <Text style={[styles.label, isActive && styles.labelActive]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#000000",
    borderTopWidth: 1,
    borderTopColor: "#27272A",
    paddingTop: 8,
    paddingBottom: Platform.OS === "ios" ? 24 : 8,
    paddingHorizontal: 24,
  },

  navContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    maxWidth: 448,
    alignSelf: "center", // ✅ RN doesn't support marginHorizontal: 'auto'
    width: "100%",
  },

  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },

  iconContainer: {
    position: "relative",
    marginBottom: 4,
  },

  badge: {
    position: "absolute",
    top: -4,
    right: -8,
    backgroundColor: "#FF5500",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    paddingHorizontal: 4,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "900",
  },

  label: {
    fontSize: 10,
    fontWeight: "600",
    color: "#71717A",
  },

  labelActive: {
    color: "#FF5500",
    fontWeight: "800",
  },
});
