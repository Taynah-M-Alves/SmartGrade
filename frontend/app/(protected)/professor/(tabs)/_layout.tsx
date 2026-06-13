import { Tabs } from "expo-router";

export default function ProfessorTabsLayout() {
  return (
    <Tabs
      screenOptions={{
      headerShown: false,
    }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
        }}
      />

      <Tabs.Screen
        name="CriarRubrica"
        options={{
          headerShown: false,
          title: "Rubrica",
        }}
      />

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