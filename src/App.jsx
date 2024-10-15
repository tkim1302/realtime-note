import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Note from "./pages/Note";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path="/note/new" element={<Note />} />
        <Route path="/note/:noteId" element={<Note />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
