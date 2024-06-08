import {router, SplashScreen, Stack} from "expo-router";
import {useEffect, useState} from "react";
import {DarkTheme, DefaultTheme, ThemeProvider} from "@react-navigation/native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {useColorScheme} from "@/hooks/useColorScheme";
import {useFonts} from "expo-font";
import {useAuthStore} from "@/hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {getAxios} from "@/hooks/getAxios";


const queryClient = new QueryClient();

export default function AppLayout() {
  const authStore = useAuthStore();
  const [authStoreLoaded, setAuthStoreLoaded] = useState(false);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    async function updateToken() {
      const token = await AsyncStorage.getItem('token');
      await authStore.setToken(token);

      try {
        if(token) {
          const axios = getAxios(token);
          const data = await axios.get("/user/");

          const user = data.data;
          user.id = user.Id;
          user.login = user.Login;

          await authStore.setUser(user);
        }
      } catch (e) {
        await authStore.setToken(null);
        await authStore.setUser(null);
      }

      setAuthStoreLoaded(true);
    }

    updateToken();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded || !authStoreLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Stack screenOptions={{headerShown: false}} />
        </QueryClientProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
