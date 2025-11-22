import { useEffect, useRef, useState } from "react";
import { useCheckValidWord, useCreateGuess, useRandomPuzzle, useSpecificPuzzle } from "../components/actions";
import WordleGrid from "../components/WordleGrid";
import useToast from "../hooks/useToast";
import { isLetter } from "../utils/utils";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "../utils/supabase";

function detectWin(wordleArr, answer) {
  for (const row of wordleArr) {
    const fullGuessFromRow = row.join("")
    if (fullGuessFromRow == answer) {
      return true;
    }
  }
  return false;
}

function MultiPlayer() {
  const [searchParams] = useSearchParams();
  const puzzleId = searchParams.get("puzzleId")
  const createGuessMutation = useCreateGuess()

  const { data: puzzle, error, isLoading } = useSpecificPuzzle(puzzleId)

  const [useWordleArray, setUseWordleArray] = useState([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null]
  ])

  const [useCurrentRow, setUseCurrentRow] = useState(0);
  const { refetch } = useCheckValidWord(useWordleArray[useCurrentRow].join("").toLowerCase());
  const { addToast, ToastContainer } = useToast();
  const currentColRef = useRef(0)

  const handleCreateGuess = () => {
    if (sessionId)
      createGuessMutation.mutate({
        guess: "",
        session_id: sessionId,
      })
  }
  const handleSubmit = () => {
    // make sure that current word is valid
    refetch().then((data: any) => {
      if (data.data.length > 0) {
        console.log("VALID")
        handleCreateGuess()

        const win = detectWin(useWordleArray, puzzle.word)
        if (win)
          addToast("🎉 You've Won! 🎉", {})
        setUseCurrentRow((prev) => prev + 1)
        currentColRef.current = 0;
      }
      else {
        console.log("NOT VALID")
        addToast("That's not a real word... 😒", { duration: 3000 })
      }
    })
  }

  const handleKeyDown = (e) => {
    const row = useCurrentRow;
    const col = currentColRef.current
    if (isLetter(e.key)) {
      if (col === useWordleArray[0].length) return
      setUseWordleArray((wordleArr) => {
        const newWordleArr = [...wordleArr]
        newWordleArr[row][col] = e.key.toUpperCase();
        return newWordleArr
      })
      currentColRef.current += 1
    }
    else if (e.key === "Backspace" && col !== 0) {
      setUseWordleArray((wordleArr) => {
        const newWordleArr = [...wordleArr]
        newWordleArr[row][col - 1] = null;
        return newWordleArr
      })
      currentColRef.current -= 1;
    }
    else if (e.key === "Enter" && col == useWordleArray[0].length) {
      handleSubmit();
    }
  }
  return (
    <div tabIndex={0} onKeyDown={handleKeyDown} className="h-full w-full grid place-items-center">
      <button onClick={() => handleCreateGuess()}>Hi</button>
      {!isLoading && (
        <WordleGrid answer={puzzle[0].word} wordleArr={useWordleArray} currentRow={useCurrentRow} />
      )}
      <ToastContainer />
    </div >
  )
}

export default MultiPlayer;
