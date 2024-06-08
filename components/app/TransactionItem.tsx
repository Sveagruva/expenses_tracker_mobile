import {ThemedView} from "@/components/ui/ThemedView";
import {ThemedText} from "@/components/ui/ThemedText";


type TransactionItemResponse = {
  id: number,
  price: number,
  categoryId: number,
  createdAt: Date,
  userId: number,
  category: {
    id: number,
    userId: number,
    name: string,
    color: string,
  }
}

export function TransactionItem({transaction}: {transaction: TransactionItemResponse}) {
  return (
    <ThemedView style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}>
      <ThemedView>
        <ThemedText>{transaction.category.name}</ThemedText>
        <ThemedText style={{
          fontWeight: 200,
        }}>
          {new Date(transaction.createdAt).toLocaleDateString()}
        </ThemedText>
      </ThemedView>
      <ThemedText>
        {transaction.price}
      </ThemedText>
    </ThemedView>
  )
}
