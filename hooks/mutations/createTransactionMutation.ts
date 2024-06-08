import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useAuth} from "@/hooks/useAuth";
import {getAxios} from "@/hooks/getAxios";


export function createTransactionMutation() {
  const auth = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transaction: any) => {
      const axios = getAxios(auth.token);
      const {data} = await axios.post('/transaction', transaction);
      return data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({queryKey: ['transactions_total']});
      await queryClient.invalidateQueries({queryKey: ['transactions']});
    }
  });
}
