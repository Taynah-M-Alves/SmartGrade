import { Stack } from "expo-router";
import AuthProvider  from "./contexts/authContext";

export default function Layout() {
    return(
        <AuthProvider>
            <Stack screenOptions={{animation: 'none', headerShown: false}}>
                <Stack.Screen name="(protected)/professor/(tabs)" options={{headerShown: false}} />
                <Stack.Screen name="screens/TelaInicial/index" options={{headerShown: false, title:'Home Inicial'}} />
                <Stack.Screen name="auth/Login/index" options={{headerShown: false, title:'Entrar'}} />
                <Stack.Screen name="auth/Cadastro/index" options={{headerShown: false, title:'Cadastrar'}} />
                <Stack.Screen name="screens/listarAtividades/index" options={{headerShown: false, title:'Minhas Atividades'}} />
            </Stack>
        </AuthProvider>
    )
}