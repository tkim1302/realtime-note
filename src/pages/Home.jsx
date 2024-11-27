import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const Home = () => {
  const navigate = useNavigate();

  const handleClickNewNote = () => {
    navigate("/note/new");
  };

  const handleClickNoteList = () => {
    navigate("/note/list");
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex h-full justify-center items-center">
        <div>
          <div className="flex flex-col gap-12 w-screen items-center ">
            <button
              className="bg-blue-500 w-1/2 h-24 rounded-xl hover:opacity-70"
              onClick={handleClickNewNote}
            >
              New Note
            </button>
            <button
              className="bg-blue-500 w-1/2 h-24 rounded-xl hover:opacity-70"
              onClick={handleClickNoteList}
            >
              Note List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
