import {ThemedView} from "@/components/ui/ThemedView";
import {ThemedText} from "@/components/ui/ThemedText";
import {CategoryInput} from "@/components/app/inputs/CategoryInput";
import {useState} from "react";
import {PaddedScreen} from "@/components/ui/PaddedScreen";
import {ThemedInput} from "@/components/ui/ThemedInput";
import {ThemedButton} from "@/components/ui/ThemedButton";
import {createTransactionMutation} from "@/hooks/mutations/createTransactionMutation";
import {useRouter} from "expo-router";


export default function AddTransactionScreen() {
  const [category, setCategory] = useState(null);
  const [price, setPrice] = useState("0");
  const createTransaction = createTransactionMutation();
  const router = useRouter();

  const addTransaction = async () => {
    if(!category || !price) {
      return;
    }

    createTransaction.mutate({
      categoryId: category,
      price: Number(price),
    });

    if(router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(auth)/(tabs)/home");
    }
  }

  return (
    <PaddedScreen>
      <ThemedView style={{flex: 1, gap: 10, marginTop: 10}}>
        <ThemedView>
          <ThemedText>Category</ThemedText>
          <CategoryInput category={category} setCategory={setCategory} />
        </ThemedView>
        <ThemedView>
          <ThemedText>Price</ThemedText>
          <ThemedInput value={price} onChangeText={setPrice} inputMode="numeric" />
        </ThemedView>
        <ThemedButton title="Add Transaction" onPress={addTransaction} />
      </ThemedView>
    </PaddedScreen>
  )
}
