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
function WordleGrid({ answer, wordleArr, currentRow }) {

  const iterateRowAndReturnSquares = () => {
    return wordleArr.map((row, rowIdx) => {
      const shouldColorize = currentRow > rowIdx;
      return (
        <WordleRow key={rowIdx} row={row} answer={answer} colorize={shouldColorize} />
      )
    })
  }

  return (
    <div className={`grid grid-cols-5 gap-2`}>
      {
        iterateRowAndReturnSquares()
      }
    </div>
  )
}


export default WordleGrid;
