import {getAxios} from "@/hooks/getAxios";
import {DateTime} from "luxon";
import {useAuth} from "@/hooks/useAuth";
import {useQuery} from "@tanstack/react-query";


export function useTransactionsTotal(date: DateTime) {
  const auth = useAuth();

  return useQuery({
    queryKey: ['transactions_total', date.toFormat("yyyy-mm-dd")],
    queryFn: async () => {
      const axios = getAxios(auth.token);
      const response = await axios.get("/transaction/total", {
        params: {
          year: date.year,
          month: date.month,
          day: date.day
        }
      });

      return response.data as {
        totalPrice: number
      };
    }
  });
}
