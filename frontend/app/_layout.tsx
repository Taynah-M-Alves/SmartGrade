import { Stack } from "expo-router";
import AuthProvider from "./contexts/authContext";

export default function Layout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          animation: "none",
          headerShown: false,
          contentStyle: {
            backgroundColor: "#F4F6FB",
          },
        }}
      >
        <Stack.Screen
          name="(protected)/professor/(tabs)"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="screens/telaInicial"
          options={{ title: "Home Inicial" }}
        />

        <Stack.Screen
          name="auth/login"
          options={{ title: "Entrar" }}
        />

        <Stack.Screen
          name="auth/cadastro/index"
          options={{ title: "Cadastrar" }}
        />

        <Stack.Screen
          name="screens/listarAtividades/index"
          options={{ title: "Minhas Atividades" }}
        />
      </Stack>
    </AuthProvider>
  );
}