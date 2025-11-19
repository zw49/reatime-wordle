import { useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabase";

export const useRandomPuzzle = () => {
  return useQuery({
    queryKey: ["random_puzzle"],
    queryFn: async () => {
      const { data, error } = await supabase.from("random_puzzle").select("*")
      if (error) {
        throw error
      }
      return data?.[0].word.toUpperCase();
    }
  })
}

export const useCheckValidWord = (guess: string) => {
  return useQuery({
    enabled: false,
    queryKey: ["valid_puzzle"],
    queryFn: async () => {
      const { data, error } = await supabase.from("valid_guesses").select("*").eq("word", guess)
      if (error) {
        throw error
      }
      return data;
    }
  })
}
