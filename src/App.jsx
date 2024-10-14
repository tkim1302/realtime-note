import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Note from "./pages/Note";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path="/note" element={<Note />} />
        <Route path="/note/:noteId" element={<Note />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
