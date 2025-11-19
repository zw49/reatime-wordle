import { useRandomPuzzle } from "../components/actions";
import WordleGrid from "../components/WordleGrid";

function SinglePlayer() {
  const { data: word, error } = useRandomPuzzle()
  return (
    <div className="h-full w-full grid place-items-center">
      <WordleGrid answer={word} />
    </div>
  )
}

export default SinglePlayer;
