import Nav from "./components/Nav"
import SinglePlayer from "./pages/SinglePlayer"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Home from "./pages/Home"
import MultiPlayer from "./pages/MultiPlayer"
function App() {
  // replace with api call here
  const queryClient = new QueryClient()
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className="text-fg bg-bg-hard h-screen">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="single" element={<SinglePlayer />} />
            <Route path="multi/*" element={<MultiPlayer />} />
          </Routes>
        </div>
      </ QueryClientProvider>
    </Router>
  )
}

export default App
