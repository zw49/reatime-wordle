import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../utils/supabase";

function OpponentGrid() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session")
  useEffect(() => {
    if (!sessionId) {
      navigate("/")
      return
    }

    const channel = supabase.channel(`session_${sessionId}`).on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'guesses',
      },
      (payload) => console.log(payload)
    ).subscribe()


  }, [sessionId])
  return (
    <div>
      opponent grid
    </div>
  )
}

export default OpponentGrid();
