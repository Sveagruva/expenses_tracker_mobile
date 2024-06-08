import {ThemedView} from "@/components/ui/ThemedView";
import {ThemedText} from "@/components/ui/ThemedText";
import {useEffect, useState} from "react";
import {StyleSheet} from "react-native";
import {ThemedInput} from "@/components/ui/ThemedInput";
import {ThemedButton} from "@/components/ui/ThemedButton";
import {Link, router, SplashScreen} from "expo-router";
import {ThemedLink} from "@/components/ui/ThemedLink";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants/src/Constants";
import {useAuth, useAuthStore} from "@/hooks/useAuth";
import {getAxios} from "@/hooks/getAxios";

export const LogIn = async (login: string, password: string) => {
  let axios = getAxios(null);
  let data = await axios.get("/user/login", {
    params: {
      login,
      password
    }
  });

  const token = data.data.token;
  axios = getAxios(token);
  data = await axios.get("/user/");

  const user = data.data;
  user.id = user.Id;
  user.login = user.Login;

  await useAuthStore.getState().setUser(user);
  await useAuthStore.getState().setToken(token);
}

export default function LoginScreen() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const authStore = useAuthStore();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  async function onLogin() {
    try {
      await LogIn(login, password);
      router.replace("/(auth)/(tabs)/home");
    } catch (e) {
      console.error(JSON.stringify(e));
    }
  }

  return (
    <ThemedView
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 15,
      }}
    >
      <ThemedText style={{marginBottom: 3}} type="title">Login</ThemedText>
      <ThemedText style={{marginBottom: 40}} type="subtitle">Sign in to continue</ThemedText>
      <ThemedView style={{
        gap: 9,
        marginBottom: 20,
      }}>
        <ThemedText type="defaultSemiBold">Login</ThemedText>
        <ThemedInput value={login} onChangeText={setLogin} />
        <ThemedText type="defaultSemiBold">Password</ThemedText>
        <ThemedInput value={password} onChangeText={setPassword} />
      </ThemedView>
      <ThemedButton title="Login" onPress={onLogin} />
      <ThemedText style={{
        marginTop: 15
      }}>
        Don't have an account? <ThemedLink replace href="/signup">Sign up</ThemedLink>
      </ThemedText>
    </ThemedView>
  );
}
