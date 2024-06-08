import {useAuth} from "@/hooks/useAuth";
import {getAxios} from "@/hooks/getAxios";
import {useQuery} from "@tanstack/react-query";


export function useCategories() {
  const auth = useAuth();

  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const axios = getAxios(auth.token);
      const response = await axios.get("/transaction/category");
      return response.data as {
        id: number,
        userId: number,
        name: string,
        color: string,
      }[];
    }
  });
}
