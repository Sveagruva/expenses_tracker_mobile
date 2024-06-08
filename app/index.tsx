import {Redirect} from "expo-router";
import {useAuthStore} from "@/hooks/useAuth";
import {useEffect} from "react";

export default function IndexScreen() {
  const authStore = useAuthStore();

  if(authStore.token) {
    return Redirect({
      href: "/(auth)/(tabs)/home"
    });
  } else {
    return Redirect({
      href: "/login"
    });
  }
}
