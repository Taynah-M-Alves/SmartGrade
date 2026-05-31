import { StyleSheet } from "react-native";

export const colors = {
  primary: "#2F5BB7",
  secondary: "#9C27B0",

  background: "#F4F5FA",
  white: "#FFFFFF",

  text: "#222222",
  gray: "#666666",
  lightGray: "#E5E7EB",

  success: "#22C55E",
  danger: "#EF4444",
  warning: "#F59E0B",

  purpleLight: "#F3E8FF",
  blueLight: "#EEF3FF",
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingHorizontal: 20,
    marginTop: 20,
  },

  logo: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.primary,
  },

  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  headerTitle: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "right",
    color: colors.text,
  },
   headerSubtitle: {
    fontSize: 18,
    lineHeight: 28,
    color: colors.gray,
    marginHorizontal: 16,
    marginTop: 8,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 30,
  },

  scoreContainer: {
    alignItems: "center",
    marginTop: 40,
  },

  circle: {
    width: 190,
    height: 190,
    borderRadius: 100,

    justifyContent: "center",
    alignItems: "center",
  },

  innerCircle: {
    width: 155,
    height: 155,
    borderRadius: 90,

    backgroundColor: colors.background,

    justifyContent: "center",
    alignItems: "center",
  },

  score: {
    fontSize: 56,
    fontWeight: "900",
    color: colors.text,
  },

  scoreLabel: {
    marginTop: 4,

    fontSize: 14,
    letterSpacing: 3,

    color: colors.gray,
  },

  title: {
    textAlign: "center",

    marginTop: 24,

    fontSize: 34,
    fontWeight: "900",

    color: colors.text,
  },

  description: {
    textAlign: "center",

    marginHorizontal: 28,
    marginTop: 16,

    fontSize: 20,
    lineHeight: 34,

    color: colors.gray,
  },

  card: {
    backgroundColor: colors.white,

    marginHorizontal: 16,
    marginTop: 24,

    borderRadius: 24,

    padding: 22,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,

    elevation: 4,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: 22,
  },
  iconBox: {
    width: 54,
    height: 54,

    borderRadius: 16,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: colors.blueLight,

    marginRight: 14,
  },

  cardTitle: {
    fontSize: 24,
    fontWeight: "800",

    color: colors.text,
  },

  bulletContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  bullet: {
    width: 10,
    height: 10,

    borderRadius: 10,

    backgroundColor: colors.primary,

    marginTop: 10,
    marginRight: 14,
  },

  bulletText: {
    flex: 1,

    fontSize: 20,
    lineHeight: 34,

    color: colors.gray,
  },

  quoteBox: {
    backgroundColor: "#F5F5FA",

    borderRadius: 20,

    flexDirection: "row",

    overflow: "hidden",

    paddingVertical: 24,
  },

  quoteBar: {
    width: 6,

    backgroundColor: "#3B43FF",

    marginLeft: 14,
    marginRight: 18,

    borderRadius: 10,
  },

  quoteText: {
    flex: 1,

    fontSize: 22,
    lineHeight: 38,

    fontStyle: "italic",

    color: colors.text,

    paddingRight: 20,
  },

  button: {
    marginTop: 24,
    marginBottom: 140,

    paddingVertical: 18,
    borderRadius: 18,

    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: colors.white,

    fontSize: 18,
    fontWeight: "800",
  },

  statsTitle: {
    fontSize: 22,
    fontWeight: "900",

    marginBottom: 24,

    color: "#666",
  },

  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 12,
  },

  statLabel: {
    fontSize: 20,
    color: "#444",
  },

  statValue: {
    fontSize: 22,
    fontWeight: "800",

    color: colors.text,
  },

  progressBar: {
    width: "100%",
    height: 12,

    backgroundColor: colors.lightGray,

    borderRadius: 20,

    overflow: "hidden",
  },

  progressFill: {
    height: "100%",

    backgroundColor: colors.primary,

    borderRadius: 20,
  },

  imageCard: {
    marginHorizontal: 16,
    marginTop: 24,

    borderRadius: 24,

    overflow: "hidden",

    marginBottom: 24,
  },

  image: {
    width: "100%",
    height: 260,
  },

  overlay: {
    position: "absolute",

    bottom: 0,

    width: "100%",

    backgroundColor: "rgba(0,0,0,0.35)",

    padding: 18,
  },

  overlayText: {
    color: colors.white,

    fontSize: 18,
    fontWeight: "600",
  },

  tabBar: {
    position: "absolute",

    bottom: 0,
    left: 0,
    right: 0,
  },

  tabItem: {
    alignItems: "center",
  },

  tabText: {
    marginTop: 6,

    color: "#9BA3B5",

    fontSize: 12,
    fontWeight: "600",
  },

  activeTab: {
    paddingHorizontal: 28,
    paddingVertical: 14,

    borderRadius: 18,

    alignItems: "center",
  },

  activeTabText: {
    color: colors.white,

    marginTop: 4,

    fontWeight: "700",
  },
  confirmButton: {
    marginTop: 24,
    marginBottom: 140,
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "800",
  },
 
});

export const globalStyles = styles;