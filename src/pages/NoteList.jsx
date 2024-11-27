import { get, getDatabase, ref } from "firebase/database";
import { useLocation, useNavigate } from "react-router-dom";
import { app, auth } from "../firebase/firebase";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Header from "../components/Header";
import { onAuthStateChanged } from "firebase/auth";

function NoteList() {
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
  }, [db, navigate]);

  const handleClickNote = (noteId) => {
    navigate(`/note/${noteId}`);
  };

  const totalPages = Math.ceil(notes.length / notesPerPage);
  const currPageNotes = notes.slice(
    (currPage - 1) * notesPerPage,
    currPage * notesPerPage
  );

  const handlePageChange = (page) => {
    setCurrPage(Number(page));

    navigate(`?page=${page}`);
  };

  const handleClickPrev = () => {
    if (currPage > 1) {
      const newPage = currPage - 1;
      setCurrPage(newPage);
      navigate(`?page=${newPage}`);
    }
  };

  const handleClickNext = () => {
    if (currPage < totalPages) {
      const newPage = currPage + 1;
      setCurrPage(newPage);
      navigate(`?page=${newPage}`);
    }
  };

  return (
    <div>
      <Header title={"Note List"} />
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
          <div className="text-white text-xl flex gap-2">
            <button onClick={() => handleClickPrev()}>prev</button>
            {Array.from({ length: totalPages }, (_, index) => index + 1)
              .slice(
                Math.floor((currPage - 1) / 5) * 5,
                Math.floor((currPage - 1) / 5) * 5 + 5
              )
              .map((page) => (
                <button
                  className={`${
                    page === currPage
                      ? "bg-blue-500 rounded-full w-6 h-6 flex justify-center items-center"
                      : ""
                  }`}
                  key={page}
                  value={page}
                  onClick={(e) => handlePageChange(e.target.value)}
                >
                  {page}
                </button>
              ))}
            <button onClick={() => handleClickNext()}>next</button>
          </div>
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
}

export default NoteList;
