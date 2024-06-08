import {getAxios} from "@/hooks/getAxios";
import {DateTime} from "luxon";
import {useAuth} from "@/hooks/useAuth";
import {useCategories} from "@/hooks/queries/useCategories";
import {useQueries} from "@tanstack/react-query";


export type CategoriesTotal = {
  id: number
  name: string
  color: string
  total: number
};

export function useCategoriesTotal(date: DateTime) {
  const auth = useAuth();
  const categories = useCategories();

  let totalQueries = [] as any[];
  if(!categories.isLoading && !categories.error) {
    totalQueries = categories.data!.map((category: any) => ({
      queryKey: ["transactions_total", category.id],
      queryFn: async () => {
        const axios = getAxios(auth.token);
        const response = await axios.get("/transaction/total", {
          params: {
            categoryId: category.id,
            year: date.year,
            month: date.month,
            day: date.day
          },
        });

        return {
          ...category,
          total: response.data.totalPrice,
        }
      },
    }));
  }

  const totals = useQueries({
    queries: totalQueries,
  });

  if (categories.isLoading || categories.error) {
    return categories;
  }

  return totals;
}
