import { get, getDatabase, ref } from "firebase/database";
import { useLocation, useNavigate } from "react-router-dom";
import { app, auth } from "../firebase/firebase";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Header from "../components/Header";
import { onAuthStateChanged } from "firebase/auth";
import PageButton from "../components/PageButton";

const NoteList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const db = getDatabase(app);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const queryParams = new URLSearchParams(location.search);
  const initialPage = Number(queryParams.get("page") || 1);
  const [currPage, setCurrPage] = useState(initialPage);

  const notesPerPage = 9;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const listRef = ref(db, "notes/");

        get(listRef)
          .then((snapshot) => {
            const data = snapshot.val();

            if (data) {
              const noteList = Object.entries(data).filter(
                ([, note]) => note.user === user.uid
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
            alert(error);
          });
      } else {
        alert("login first");
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [db, navigate, initialPage]);

  const handleClickNote = (noteId) => {
    navigate(`/note/${noteId}`);
  };

  const totalPages = Math.ceil(notes.length / notesPerPage);
  const currPageNotes = notes.slice(
    (currPage - 1) * notesPerPage,
    currPage * notesPerPage
  );

  return (
    <div>
      <Header />
      <div className="flex justify-center mt-24 gap">
        <div className="flex flex-col gap-24">
          <div className="grid grid-cols-3 gap-12">
            {isLoading ? (
              <Loading />
            ) : currPageNotes.length > 0 ? (
              currPageNotes.map(([noteId, note]) => (
                <div
                  key={noteId}
                  className="transition ease-in-out hover:-translate-y-3 hover:scale-110 w-56 h-56 bg-white text-black rounded-xl cursor-pointer pt-5 pl-2 pr-2 pb-2"
                  onClick={() => handleClickNote(noteId)}
                >
                  <p className="break-words whitespace-normal">
                    {note.content}
                  </p>
                </div>
              ))
            ) : (
              <p>No notes found</p>
            )}
          </div>
          <PageButton
            totalPages={totalPages}
            currPage={currPage}
            setCurrPage={setCurrPage}
          />
          <button
            className="bg-blue-500 w-36 h-12 rounded-xl"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteList;
