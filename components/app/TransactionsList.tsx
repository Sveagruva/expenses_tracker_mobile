import {FlashList} from "@shopify/flash-list";
import {TransactionItem} from "@/components/app/TransactionItem";
import {useAuth} from "@/hooks/useAuth";
import {getAxios} from "@/hooks/getAxios";
import {useInfiniteQuery} from "@tanstack/react-query";
import {ThemedView} from "@/components/ui/ThemedView";


const itemsForRequest = 15;

export function TransactionsList() {
  const auth = useAuth();
  const trans = useInfiniteQuery({
    queryKey: ['transactions'],
    initialPageParam: 1,
    queryFn: async ({pageParam}) => {
      const axios = getAxios(auth.token);
      const response = await axios.get("/transaction", {
        params: {
          page: pageParam,
          items: itemsForRequest
        }
      })

      return response.data;
    },
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      const got = lastPageParam * itemsForRequest;
      if (got >= lastPage.count) {
        return undefined;
      }

      return lastPageParam + 1
    }
  });

  const items = trans.data?.pages.flatMap((page) => page.items) || [];

  return (
    <FlashList
      data={items}
      renderItem={
        ({item}) =>
          <ThemedView style={{
            paddingVertical: 8
          }}>
            <TransactionItem transaction={item as any} />
          </ThemedView>
      }
      estimatedItemSize={200}
      onEndReachedThreshold={0.5}
      onEndReached={trans.fetchNextPage}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
    />
  )
}
