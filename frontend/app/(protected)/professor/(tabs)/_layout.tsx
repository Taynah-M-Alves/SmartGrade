import { Tabs } from "expo-router";
import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function ProfessorTabsLayout() {
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

      {/* <Tabs.Screen
        name="CriarRubrica"
        options={{
          headerShown: false,
          title: "Rubrica",
        }}
      /> */}

      <Tabs.Screen
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
      />
    </Tabs>
  );
}