import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import useStore from "../utils/store";
import Header from "../components/Header";

const Home = () => {
  const { setUser } = useStore();
  const navigate = useNavigate();

  const handleClickNewNote = () => {
    navigate("/note/new");
  };

  const handleClickNoteList = () => {
    navigate("/note/list");
  };

  const handleLogout = () => {
    signOut(auth);
    setUser(null);
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
              <button
                className="bg-blue-500 w-36 h-12 rounded-xl"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
