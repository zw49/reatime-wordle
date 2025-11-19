import Nav from "./components/Nav"
import WordleGrid from "./components/WordleGrid"
import { useEffect, useRef, useState } from "react"
import { isLetter } from "./utils/utils"
import { supabase } from "./utils/supabase"

function App() {
  // replace with api call here
  const [word, setWord] = useState(null);
  async function getRandomPuzzle() {
    const { data, error } = await supabase.from("random_puzzle").select("*")
    if (error) {
      throw error
    }
    return data?.[0].word.toUpperCase();
  }

  useEffect(() => {
    getRandomPuzzle().then((word) => {

      console.log(word)

      setWord(word)
    });
  }, [])

  const [useWordleArray, setUseWordleArray] = useState([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null]
  ])
  const [useCurrentRow, setUseCurrentRow] = useState(0);

  const currentColRef = useRef(0)

  const handleSubmit = () => {
    // make sure that current word is valid
    setUseCurrentRow((prev) => prev + 1)
    currentColRef.current = 0;
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
    <div tabIndex={0} onKeyDown={handleKeyDown} className="text-fg bg-bg-hard h-screen">
      <Nav />
      <div className="h-full w-full grid place-items-center">
        <WordleGrid wordleArr={useWordleArray} answer={word} currentRow={useCurrentRow} />
      </div>
    </div>
  )
}

export default App
