import Nav from "./components/Nav"
import WordleGrid from "./components/WordleGrid"
import { useEffect, useRef, useState } from "react"
import { isLetter } from "./utils/utils"
import { supabase } from "./utils/supabase"
import { useRandomPuzzle } from "./components/actions"
import SinglePlayer from "./pages/SinglePlayer"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Home from "./pages/Home"
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
          </Routes>
        </div>
      </ QueryClientProvider>
    </Router>
  )
}

export default App
