import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import Note from "./pages/Note";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/' element={<Home />}></Route>
        <Route path="/note" element={<Note />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
