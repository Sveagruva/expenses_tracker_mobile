import { Text, View } from "react-native";
import {useEffect, useState} from "react";
import {ThemedView} from "@/components/ui/ThemedView";
import {ThemedText} from "@/components/ui/ThemedText";
import {ThemedInput} from "@/components/ui/ThemedInput";
import {ThemedButton} from "@/components/ui/ThemedButton";
import {ThemedLink} from "@/components/ui/ThemedLink";
import {useAuth} from "@/hooks/useAuth";
import {getAxios} from "@/hooks/getAxios";
import {LogIn} from "@/app/login";
import {useRouter} from "expo-router";



export default function SignupScreen() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function onSignUp() {
    console.log("Sign up");

    try {
      const axios = getAxios(null);
      await axios.post("/user/register", {
        login: login,
        password: password
      })

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
      <ThemedText style={{marginBottom: 3}} type="title">Sign up</ThemedText>
      <ThemedText style={{marginBottom: 40}} type="subtitle">Sign up to continue</ThemedText>
      <ThemedView style={{
        gap: 9,
        marginBottom: 20,
      }}>
          <ThemedText type="defaultSemiBold">Login</ThemedText>
          <ThemedInput value={login} onChangeText={setLogin} />
          <ThemedText type="defaultSemiBold">Password</ThemedText>
          <ThemedInput value={password} onChangeText={setPassword} />
      </ThemedView>

      <ThemedButton title="Sign Up" onPress={onSignUp} />
      <ThemedText style={{
        marginTop: 15
      }}>
        Already have an account? <ThemedLink replace href="/login">Sign in</ThemedLink>
      </ThemedText>
    </ThemedView>
  );
}
