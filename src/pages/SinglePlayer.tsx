import { useRef, useState } from "react";
import { useCheckValidWord, useRandomPuzzle } from "../components/actions";
import WordleGrid from "../components/WordleGrid";
import useToast from "../hooks/useToast";
import { isLetter } from "../utils/utils";
import Alphabet from "../components/Alphabet";

function detectWin(wordleArr, answer) {
  for (const row of wordleArr) {
    const fullGuessFromRow = row.join("")
    if (fullGuessFromRow == answer) {
      return true;
    }
  }
  return false;
}

function SinglePlayer() {
  const [useWordleArray, setUseWordleArray] = useState([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null]
  ])

  const [useCurrentRow, setUseCurrentRow] = useState(0);
  const { data: word, error } = useRandomPuzzle()
  console.log(word)
  const { refetch } = useCheckValidWord(useWordleArray[useCurrentRow]?.join("").toLowerCase());
  const { addToast, ToastContainer } = useToast();
  const currentColRef = useRef(0)

  const handleSubmit = () => {
    // make sure that current word is valid
    refetch().then((data: any) => {
      if (data.data.length > 0) {
        console.log("VALID")
        const win = detectWin(useWordleArray, word)
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
    <div tabIndex={0} onKeyDown={handleKeyDown} className="h-full w-full grid grid-cols-3 place-items-center">
      <Alphabet wordleArr={useWordleArray} answer={word} currentRow={useCurrentRow} />
      <WordleGrid answer={word} wordleArr={useWordleArray} currentRow={useCurrentRow} />
      <ToastContainer />
    </div>
  )
}

export default SinglePlayer;
