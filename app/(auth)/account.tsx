import {ThemedText} from "@/components/ui/ThemedText";
import {ThemedButton} from "@/components/ui/ThemedButton";
import {SafeArea} from "@/components/ui/SafeArea";
import {PaddedScreen} from "@/components/ui/PaddedScreen";
import {useAuth, useAuthStore} from "@/hooks/useAuth";
import {ThemedView} from "@/components/ui/ThemedView";

async function onLogOut() {
  const auth = useAuthStore.getState();
  await auth.setToken(null);
  await auth.setUser(null);
}


export default function AccountScreen() {
  const auth = useAuth();

  console.log(auth.user);

  return (
    <SafeArea>
      <PaddedScreen>
        <ThemedView style={{
          gap: 15,
        }}>
          <ThemedText style={{
            fontSize: 20,
          }}>
            Id: {auth.user.id}
          </ThemedText>
          <ThemedText style={{
            fontSize: 20,
          }}>
            Login: {auth.user.login}
          </ThemedText>
          <ThemedButton title="log out" onPress={onLogOut} />
        </ThemedView>
      </PaddedScreen>
    </SafeArea>
  );
}
