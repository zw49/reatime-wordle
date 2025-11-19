import { useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";


function Home() {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full flex gap-2 items-center justify-center">
      <button onClick={() => navigate("/single")}>
        Single Player
      </button>
      <button onClick={() => navigate("/multi")}>
        Multi Player
      </button>
    </div>
  )
}

export default Home
