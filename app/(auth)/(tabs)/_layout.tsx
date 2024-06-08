import {Redirect, router, SplashScreen, Stack, Tabs, useRouter} from "expo-router";
import {ProtectedAuthProvider, useAuthStore} from "@/hooks/useAuth";
import {useEffect} from "react";

export default function TabsLayout() {
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
    <Tabs
      // screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          // tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: 'Categories',
          // tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
