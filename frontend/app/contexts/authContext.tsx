import { router } from "expo-router";
import {createContext, PropsWithChildren, useState, useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type User = {
    id: number;
    name: string;
    email: string;
    role: string;
}

type AuthState = {
    isLoggedIn: boolean;
    isReady: boolean;
    roleUser: string | null;
    token: string | null;
    userId: number | null;
    user: User | null;

    signIn: (
      user: User,
      token: string
    ) => void;

    signOut: () => void;
}

const AUTH_STORAGE_KEY = "@myapp:auth-state"

export const AuthContext = createContext<AuthState>({} as AuthState)

export default function AuthProvider({children} : PropsWithChildren){
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isReady, setIsReady]=useState(false)
    const [roleUser, setRoleUser] = useState("")
    const [token, setToken] = useState<string | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const [user, setUser] = useState<User | null>(null);

    async function storageState(newState: {isLoggedIn: boolean, roleUser: string | null, token: string | null,  userId: number | null; user: User | null}) {
        try{
            await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newState))

        }catch(error){
            console.log("ERROR_SET_STORAGE_AUTH:",error)
        }
    }

    function signIn(user: User, token: string, ) {
        setRoleUser(user.role);
        setToken(token);
        setUserId(user.id);
        setUser(user);
        setIsLoggedIn(true);
        storageState({
            isLoggedIn: true, 
            roleUser: user.role, 
            token,
            userId: user.id,
            user
        })
        
        if (user.role === "PROFESSOR") {
            router.replace("/(protected)/professor/(tabs)");
        } else {
            router.replace("/(protected)/aluno/(tabs)");
        }

    }

    function signOut() {
        setIsLoggedIn(false)
        setRoleUser("");
        setToken(null);
        setUserId(null);
        setUser(null)

        storageState({
            isLoggedIn: false,
            roleUser: null,
            token: null,
            userId: null,
            user: null})
        router.replace("/screens/telaInicial")
    }

    useEffect(() => {
        async function loadStorageAuthState(){
            try{
                const storageState = await AsyncStorage.getItem(AUTH_STORAGE_KEY)
                const state = storageState ? JSON.parse(storageState) : null;     
                
                const role = state?.roleUser ?? "";

                setRoleUser(role);


                setToken(state?.token ?? null);
                setUserId(state?.userId ?? null);
                setUser(state?.user ?? null);
                setIsLoggedIn(state?.isLoggedIn ?? false);


            }catch(error){
                console.log("ERROR_GET_STORAGE_AUTH:",error)
                setIsLoggedIn(false)
            } finally {
                setIsReady(true)
            }
        }

        loadStorageAuthState()
    },[])

    return(
        <AuthContext.Provider value={{ 
        isLoggedIn,
        roleUser,
        token,
        userId,
        user,
        signIn,
        signOut,
        isReady}}>
            {children}
        </AuthContext.Provider>
    )
}