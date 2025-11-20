import { useEffect, useRef, useState } from "react";
import WordleSquare from "./WordleSquare";
function Alphabet({ wordleArr, answer, currentRow }) {
  const alphabet: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
  const [alphabetStates, setAlphabetStates] = useState(["normal", "normal", "normal", "normal", "normal", "normal", "normal", "normal", "normal", "normal", "normal", "normal", "normal", "normal", "normal", "normal", "normal", "normal", "normal", "normal", "normal", "normal", "normal", "normal", "normal", "normal"]);

  const setStates = () => {
    const newAlphabetStates = [...alphabetStates]
    if (currentRow === 0) return
    const previousRow = currentRow - 1
    for (const letter of wordleArr[previousRow]) {
      if (answer.includes(letter)) {
        if (answer.indexOf(letter) === wordleArr[previousRow].indexOf(letter))
          newAlphabetStates[alphabet.indexOf(letter)] = "correct"
        else
          newAlphabetStates[alphabet.indexOf(letter)] = "almost"
      } else
        newAlphabetStates[alphabet.indexOf(letter)] = "incorrect"
    }
    setAlphabetStates(newAlphabetStates)
  }

  useEffect(setStates, [currentRow])

  return (
    <div className="grid grid-cols-5 gap-1">
      {alphabet.map((letter: any, idx) => {
        return <WordleSquare key={idx} variant={alphabetStates[idx]} value={letter} className="text-2xl w-12 h-12" />
      })}
    </div>
  )
}

export default Alphabet;
