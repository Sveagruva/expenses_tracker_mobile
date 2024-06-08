import {useSafeAreaInsets} from "react-native-safe-area-context";
import {ReactNode} from "react";
import {ThemedView} from "@/components/ui/ThemedView";


export function SafeArea({children}: { children: ReactNode }) {
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={{
      flex: 1,
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right
    }}>
      {children}
    </ThemedView>
  );
}
