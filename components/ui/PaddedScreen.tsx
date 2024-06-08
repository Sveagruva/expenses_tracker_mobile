import {ThemedView} from "@/components/ui/ThemedView";
import {ReactNode} from "react";


export function PaddedScreen({children}: { children: ReactNode }) {
  return (
    <ThemedView style={{
      flex: 1,
      paddingHorizontal: 16,
    }}>
      {children}
    </ThemedView>
  );
}
