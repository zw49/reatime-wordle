import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "../utils/supabase";

export const useSpecificPuzzle = (puzzleId: string) => {
  return useQuery({
    queryKey: ["random_puzzle"],
    queryFn: async () => {
      const { data, error } = await supabase.from("puzzles").select("*").eq("id", puzzleId)
      if (error) {
        throw error
      }
      return data[0];
    }
  })
}
export const useRandomPuzzle = () => {
  return useQuery({
    queryKey: ["random_puzzle"],
    queryFn: async () => {
      const { data, error } = await supabase.from("random_puzzle").select("*")
      if (error) {
        throw error
      }
      return data?.[0];
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

export const useCreateGuess = () => {
  return useMutation(
    {
      mutationFn: async (guess: { guess: string, session_id: string }) => {
        const { data, error } = await supabase.from("guesses").insert(guess).single()

        if (error) throw error
        return data
      }
    }
  )
}

export async function createSession() {
  const { data, error } = await supabase.from('sessions').insert({}).select();
  if (error) throw error;
  const sessionId = data?.[0].id;
  console.log(data)
  const link = `${window.location.origin}/multi?session=${sessionId}`;
  return link;
}

