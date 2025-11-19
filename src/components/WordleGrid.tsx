// function WordleSquare({ value, variant }) {
//   if (variant == "incorrect") {
//     return (
//       <div className="shadow-2xl grid place-items-center border-2 border-red rounded-sm w-20 h-20 font-extrabold text-5xl text-red">
//         {value == null ? "" : value}
//       </div>
//     )
//   }
//
//   if (variant == "correct") {
//     return (
//       <div className="shadow-2xl grid place-items-center border-2 border-green rounded-sm w-20 h-20 font-extrabold text-5xl text-green">
//         {value == null ? "" : value}
//       </div>
//     )
//   }
//   if (variant == "almost") {
//     return (
//       <div className="shadow-2xl grid place-items-center border-2 border-yellow rounded-sm w-20 h-20 font-extrabold text-5xl text-yellow">
//         {value == null ? "" : value}
//       </div>
//     )
//   }
//   if (variant == "normal") {
//     return (
//       <div className="shadow-2xl grid place-items-center border-2 border-bg-soft rounded-sm w-20 h-20 font-extrabold text-5xl">
//         {value == null ? "" : value}
//       </div>
//     )
//   }
// }
//
// function WordleRow({ row, answer, colorize }) {
//   if (colorize) {
//     return row.map((cellValue, cellIdx) => {
//       if (cellValue === answer[cellIdx])
//         return <WordleSquare key={cellIdx} value={cellValue} variant={"correct"} />
//       else if (answer.includes(cellValue))
//         return <WordleSquare key={cellIdx} value={cellValue} variant={"almost"} />
//       else
//         return <WordleSquare key={cellIdx} value={cellValue} variant={"incorrect"} />
//     })
//   } else {
//     return row.map((cellValue, cellIdx) => {
//       return <WordleSquare key={cellIdx} value={cellValue} variant={"normal"} />
//     })
//   }
// }

import { useEffect, useRef, useState } from "react";
import WordleRow from "./WordleRow";
import { supabase } from "../utils/supabase";
import { isLetter } from "../utils/utils";
import { useCheckValidWord } from "./actions";
import useToast from "../hooks/useToast";

//
function WordleGrid({ answer }) {
  const { addToast, ToastContainer } = useToast();
  const [useWordleArray, setUseWordleArray] = useState([
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null],
    [null, null, null, null, null]
  ])

  const [useCurrentRow, setUseCurrentRow] = useState(0);
  const { data, error, refetch } = useCheckValidWord(useWordleArray[useCurrentRow].join("").toLowerCase());

  const currentColRef = useRef(0)

  const handleSubmit = () => {
    // make sure that current word is valid
    refetch().then((data: any) => {
      if (data.data.length > 0) {
        console.log("VALID")
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

  const iterateRowAndReturnSquares = () => {
    return useWordleArray.map((row, rowIdx) => {
      const shouldColorize = useCurrentRow > rowIdx;
      return (
        <WordleRow key={rowIdx} row={row} answer={answer} colorize={shouldColorize} />
      )
    })
  }

  return (
    <div tabIndex={0} onKeyDown={handleKeyDown} className={`grid grid-cols-5 gap-2`}>
      {
        iterateRowAndReturnSquares()
      }
      <ToastContainer />
    </div>
  )
}


export default WordleGrid;
