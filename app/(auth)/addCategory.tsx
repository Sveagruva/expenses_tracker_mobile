import {ThemedView} from "@/components/ui/ThemedView";
import {ThemedText} from "@/components/ui/ThemedText";
import {CategoryInput} from "@/components/app/inputs/CategoryInput";
import {useState} from "react";
import {PaddedScreen} from "@/components/ui/PaddedScreen";
import {ThemedInput} from "@/components/ui/ThemedInput";
import {ThemedButton} from "@/components/ui/ThemedButton";
import {createTransactionMutation} from "@/hooks/mutations/createTransactionMutation";
import {useRouter} from "expo-router";
import ColorPicker, {Panel3, Swatches} from "reanimated-color-picker";
import {ThemedColorPicker} from "@/components/ui/ColorPicker";
import {createCategoryMutation} from "@/hooks/mutations/createCategoryMutation";


export default function AddTransactionScreen() {
  const [color, setColor] = useState("#000000");
  const [name, setName] = useState("");
  const categoryMutation = createCategoryMutation();
  const router = useRouter();

  const addCategory = async () => {
    if (name === "" || color === "#000000") {
      return;
    }

    categoryMutation.mutate({
      name: name,
      color: color,
    });

    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(auth)/(tabs)/home");
    }
  }

  return (
    <PaddedScreen>
      <ThemedView style={{flex: 1, gap: 10, marginTop: 10}}>
        <ThemedView>
          <ThemedText>Color</ThemedText>
          <ThemedColorPicker
            colors={[
              "#ec4899",
              "#f43f5e",
              "#d946ef",
              "#a855f7",
              "#8b5cf6",
              "#6366f1",
              "#3b82f6",
              "#0ea5e9",
            ]}
            value={color}
            onChange={setColor
            }/>
        </ThemedView>
        <ThemedView>
          <ThemedText>Name</ThemedText>
          <ThemedInput value={name} onChangeText={setName} />
        </ThemedView>
        <ThemedButton title="Add Category" onPress={addCategory}/>
      </ThemedView>
    </PaddedScreen>
  )
}
