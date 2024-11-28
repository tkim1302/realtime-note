import { get, getDatabase, ref } from "firebase/database";
import { useLocation, useNavigate } from "react-router-dom";
import { app } from "../firebase/firebase";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Header from "../components/Header";
import PageButton from "../components/PageButton";
import useStore from "../utils/store";

const NoteList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useStore();

  const db = getDatabase(app);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const initialPage = Number(queryParams.get("page") || 1);
  const [currPage, setCurrPage] = useState(initialPage);

  const notesPerPage = 6;

  useEffect(() => {
    const listRef = ref(db, "notes/");

    get(listRef)
      .then((snapshot) => {
        const data = snapshot.val();

        if (data) {
          const noteList = Object.entries(data).filter(([, note]) =>
            note.users.includes(user.uid)
          );
          setNotes(noteList);
          setIsLoading(false);
          navigate(`?page=${initialPage}`);
        } else {
          alert("no data");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [db, user.uid, navigate, initialPage]);

  const handleClickNote = (noteId) => {
    navigate(`/note/${noteId}`);
  };

  const totalPages = Math.ceil(notes.length / notesPerPage);
  const currPageNotes = notes.slice(
    (currPage - 1) * notesPerPage,
    currPage * notesPerPage
  );

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex justify-center mt-12 h-full">
        <div className="flex flex-col">
          <div>
            {isLoading ? (
              <Loading />
            ) : currPageNotes.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
                  {currPageNotes.map(([noteId, note]) => (
                    <div
                      key={noteId}
                      className="transition ease-in-out hover:-translate-y-3 hover:scale-110 w-56 h-56 bg-white text-black rounded-xl cursor-pointer p-3 truncate"
                      onClick={() => handleClickNote(noteId)}
                    >
                      <p className="break-words whitespace-normal">
                        {note.content}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-6 mb-6">
                  <PageButton
                    totalPages={totalPages}
                    currPage={currPage}
                    setCurrPage={setCurrPage}
                  />
                </div>
              </div>
            ) : (
              <p>No notes found</p>
            )}
          </div>

          {isLoading ? (
            ""
          ) : (
            <div className="flex justify-end">
              <button
                className="bg-blue-500 w-36 h-12 rounded-xl"
                onClick={() => navigate("/")}
              >
                Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteList;
