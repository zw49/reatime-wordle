import { useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";


function Home() {
  const { addToast, ToastContainer } = useToast();
  const navigate = useNavigate();
  return (
    <div className="h-full w-full grid place-items-center">
      <button onClick={() => navigate("/single")}>
        Single Player
      </button>
      <button onClick={() => addToast("Data saved successfully!", { duration: 2000 })}>
        Test notify
      </button>
      <ToastContainer />
    </div>
  )
}

export default Home
