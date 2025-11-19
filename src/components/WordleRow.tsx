import WordleSquare from "./WordleSquare"

function WordleRow({ row, answer, colorize }) {
  if (colorize) {
    return row.map((cellValue, cellIdx) => {
      if (cellValue === answer[cellIdx])
        return <WordleSquare key={cellIdx} value={cellValue} variant={"correct"} />
      else if (answer.includes(cellValue))
        return <WordleSquare key={cellIdx} value={cellValue} variant={"almost"} />
      else
        return <WordleSquare key={cellIdx} value={cellValue} variant={"incorrect"} />
    })
  } else {
    return row.map((cellValue, cellIdx) => {
      return <WordleSquare key={cellIdx} value={cellValue} variant={"normal"} />
    })
  }
}

export default WordleRow;
