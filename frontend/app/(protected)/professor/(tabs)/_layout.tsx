import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAuth } from "hooks/useAuth";
import { Pressable } from "react-native";

export default function ProfessorTabsLayout() {

  const { signOut } = useAuth();

  return (
    <Tabs
      screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: 'purple'
    }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color }) => <FontAwesome size={34} name="home" color={color} />
        }}
      />
      <Tabs.Screen
        name="CriarAtividade/index"
        options={{
          headerShown: false,
          title: "Criar Atividade",
          tabBarIcon: ({ color }) => <FontAwesome size={34} name="tasks" color={color} />
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
    title: 'Sair',
    tabBarIcon: ({ color }) => (
      <FontAwesome
        name="sign-out"
        size={28}
        color={color}
      />
    ),
  }}
/>
    </Tabs>
  );
}