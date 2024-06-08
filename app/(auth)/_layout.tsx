import {Redirect, router, SplashScreen, Stack, Tabs, useRouter} from "expo-router";
import {ProtectedAuthProvider, useAuthStore} from "@/hooks/useAuth";
import {useEffect} from "react";

export default function AuthLayout() {
  const authStore = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if(authStore.token === null) {
      router.replace("/login");
    }
  }, [authStore.token]);

  if(authStore.token === null || authStore.user === null) {
    return null;
  }

  return (
    <ProtectedAuthProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false, title: "Home" }}/>
        <Stack.Screen name="addTransaction" options={{
          presentation: "modal",
          gestureEnabled: true,
          title: "Add Transaction",
        }}/>
        <Stack.Screen name="addCategory" options={{
          presentation: "modal",
          gestureEnabled: true,
          title: "Add Category",
        }}/>
      </Stack>
    </ProtectedAuthProvider>
  );
}
