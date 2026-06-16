import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet } from "react-native";
import { useAuth } from "hooks/useAuth";

export default function ProfessorTabsLayout() {
  const { signOut } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#6C5CE7",
        tabBarInactiveTintColor: "#B0B8C9",
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabLabel,
        tabBarItemStyle: styles.tabItem,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <Ionicons name={focused ? "home" : "home-outline"} size={22} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="criarAtividade"
        options={{
          title: "Nova Atividade",
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <Ionicons name={focused ? "add-circle" : "add-circle-outline"} size={22} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="logout"
        listeners={{
          tabPress: async (e) => {
            e.preventDefault();
            await signOut();
          },
        }}
        options={{
          title: "Sair",
          tabBarIcon: ({ color }) => (
            <View style={styles.iconWrap}>
              <Ionicons name="log-out-outline" size={22} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 0,
    elevation: 20,
    shadowColor: "#6C5CE7",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    height: 72,
    paddingBottom: 10,
    paddingTop: 8,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },
  tabItem: {
    paddingTop: 4,
  },
  iconWrap: {
    width: 40,
    height: 32,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapActive: {
    backgroundColor: "#EDE9FF",
  },
});
