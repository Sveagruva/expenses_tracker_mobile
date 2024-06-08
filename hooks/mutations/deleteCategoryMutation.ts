import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useAuth} from "@/hooks/useAuth";
import {getAxios} from "@/hooks/getAxios";


export function deleteCategoryMutation() {
  const auth = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (category: any) => {
      const axios = getAxios(auth.token);
      const {data} = await axios.delete('/transaction/category', {
        data: {
          id: category.id,
        },
      });
      return data;
    },
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({queryKey: ['categories']});
    }
  });
}
