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
    <div>
      <Header />
      <div className="flex justify-center">
        <div className="flex flex-col justify-center h-screen text-xl">
          <div>
            <div className="flex gap-12">
              <button
                className="bg-blue-500 w-36 h-12 rounded-xl"
                onClick={handleClickNewNote}
              >
                New Note
              </button>
              <button
                className="bg-blue-500 w-36 h-12 rounded-xl"
                onClick={handleClickNoteList}
              >
                Note List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
