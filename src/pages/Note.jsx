import { useEffect, useMemo, useRef, useState } from "react";
import { app, auth } from "../firebase/firebase";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../utils/store";
import SavedNotification from "../components/SavedNotification";
import Header from "../components/Header";
import getCaretCoordinates from "textarea-caret";
import { onAuthStateChanged } from "firebase/auth";

const Note = () => {
  const { user, setUser, setNote } = useStore();
  const navigate = useNavigate();
  const { noteId } = useParams();
  const [liveValue, setLiveValue] = useState("");
  const [userName, setUserName] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const liveValueRef = useRef(liveValue);
  const [cursorPositionX, setCursorPositionX] = useState(0);
  const [cursorPositionY, setCursorPositionY] = useState(0);

  const db = useMemo(() => getDatabase(app), []);

  useEffect(() => {
    liveValueRef.current = liveValue;
  }, [liveValue]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        if (noteId) setNote(noteId);
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [setUser, setNote, noteId, navigate]);

  useEffect(() => {
    if (noteId) {
      const noteRef = ref(db, `notes/${noteId}`);
      const unsubscribeNote = onValue(noteRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setLiveValue(data.content);
        } else {
          alert("No data found");
        }
      });

      const cursorRef = ref(db, `notes/${noteId}/cursors`);
      const unsubscribeCursors = onValue(cursorRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const collaboratorData = Object.entries(data).filter(
            ([key]) => key !== user?.uid
          );
          if (collaboratorData.length > 0) {
            const collaborator = collaboratorData[0][1];
            setCursorPositionX(collaborator.cursorPositionX);
            setCursorPositionY(collaborator.cursorPositionY);
            setUserName(collaborator.name);
          }
        }
      });

      return () => {
        unsubscribeNote();
        unsubscribeCursors();
      };
    }
  }, [noteId, db, user?.uid]);

  useEffect(() => {
    const timerId = setInterval(() => {
      handleSubmit(noteId);
    }, 20000);

    return () => clearInterval(timerId);
  }, [noteId]);

  const handleSubmit = async (noteId) => {
    const currentLiveValue = liveValueRef.current;
    if (!noteId) {
      const noteRef = push(ref(db, "notes"));
      await set(noteRef, {
        content: currentLiveValue,
        user: user?.uid,
      })
        .then(() => {
          showSavedMessage();
        })
        .catch((error) => {
          alert(error.message);
        });

      const _noteId = noteRef.key;
      navigate(`/note/${_noteId}`);
    } else {
      const noteRef = ref(db, `notes/${noteId}`);
      await set(noteRef, {
        content: currentLiveValue,
        user: user?.uid,
      })
        .then(() => {
          showSavedMessage();
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const showSavedMessage = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  const liveChange = async (e) => {
    const newVal = e.target.value;
    setLiveValue(newVal);
    if (noteId) {
      const noteRef = ref(db, `notes/${noteId}`);
      await set(noteRef, {
        content: newVal,
      }).catch((error) => {
        alert(error.message);
      });
    }
  };

  const handleCursorChange = async (e) => {
    const position = e.target.selectionStart;
    const coordinates = getCaretCoordinates(e.target, position);
    const noteRef = ref(db, `notes/${noteId}/cursors/${user?.uid}`);

    await set(noteRef, {
      name: user?.displayName,
      cursorPositionX: coordinates.left,
      cursorPositionY: coordinates.top,
    }).catch((error) => {
      alert(error.message);
    });
  };

  return (
    <div>
      <Header title={"Note"} />
      <div className="relative flex flex-col items-center justify-center h-screen gap-10">
        {isSaved && (
          <div className="absolute flex top-16">
            <SavedNotification />
          </div>
        )}
        <div className="relative w-96 h-96">
          <textarea
            className="border border-black w-96 h-96 text-left align-top caret-red-500 pl-5 pt-5 pb-5 pr-5 rounded-xl text-black"
            type="text"
            value={liveValue}
            onChange={(e) => liveChange(e)}
            onSelect={handleCursorChange}
          />
          {userName && (
            <div
              className="absolute"
              style={{
                top: `${cursorPositionY}px`,
                left: `${cursorPositionX}px`,
              }}
            >
              <div className="bg-blue-500 h-6 w-1"></div>
            </div>
          )}
        </div>
        {userName && (
          <div className="text-gray-100 font-bold text-xl">
            collaborator: <span className="text-blue-500">{userName}</span>
          </div>
        )}
        <div className="flex gap-16">
          <button
            className="bg-blue-500 w-24 h-16 rounded-xl"
            onClick={() => handleSubmit(noteId)}
          >
            Save
          </button>
          <button
            className="bg-blue-500 w-24 h-16 rounded-xl"
            onClick={() => navigate("/note/list")}
          >
            Note List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Note;
