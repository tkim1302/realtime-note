import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Note from "./pages/Note";
import Login from "./pages/Login";
import NoteList from "./pages/NoteList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Home />} />
        <Route path="/note/new" element={<Note />} />
        <Route path="/note/:noteId" element={<Note />} />
        <Route path="/login" element={<Login />} />
        <Route path="/note/list" element={<NoteList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
