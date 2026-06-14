import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useAuth } from "hooks/useAuth";
import { TouchableOpacity } from "react-native";

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
        name="CriarRubrica/index"
        options={{
          headerShown: false,
          title: "Criar Atividade",
          tabBarIcon: ({ color }) => <FontAwesome size={34} name="tasks" color={color} />
        }}
      />

      <Tabs.Screen
        name="CriarRubrica"
        options={{
          headerShown: false,
          title: "Criar Atividade",
          tabBarIcon: ({ color }) => <FontAwesome size={34} name="tasks" color={color} />
        }}
      />

      {/* <Tabs.Screen
        name="listarAtividades"
        options={{
          headerShown: false,
          title: "Atividades",
        }}
      />

      <Tabs.Screen
        name="Feedback"
        options={{
          headerShown: false,
          title: "Feedback",
        }}
      /> */}

      <Tabs.Screen
  name="logout"
  options={{
    title: "Sair",
    tabBarIcon: ({ color }) => (
      <FontAwesome
        size={28}
        name="sign-out"
        color={color}
      />
    ),
    tabBarButton: (props) => (
      <TouchableOpacity
        {...props}
        onPress={() => signOut()}
      />
    ),
  }}
/>
    </Tabs>
  );
}