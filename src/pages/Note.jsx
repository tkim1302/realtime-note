import { useEffect, useMemo, useRef, useState } from "react";
import { app } from "../firebase/firebase";
import {
  getDatabase,
  get,
  ref,
  set,
  push,
  onValue,
  update,
} from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../utils/store";
import SavedNotification from "../components/SavedNotification";
import Header from "../components/Header";
import getCaretCoordinates from "textarea-caret";
import HowToUseButton from "../components/HowToUseButton";

const Note = () => {
  const { user } = useStore();
  const { noteId } = useParams();
  const navigate = useNavigate();
  const [liveValue, setLiveValue] = useState("");
  const [userName, setUserName] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const liveValueRef = useRef(liveValue);
  const autoSaveTimerRef = useRef(null);
  const [cursorPositionX, setCursorPositionX] = useState(0);
  const [cursorPositionY, setCursorPositionY] = useState(0);

  const db = useMemo(() => getDatabase(app), []);

  useEffect(() => {
    liveValueRef.current = liveValue;
  }, [liveValue]);

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
    startTimer();

    return () => clearTimer();
  }, [noteId]);

  const startTimer = () => {
    clearTimer();
    autoSaveTimerRef.current = setInterval(() => {
      handleSubmit(noteId);
    }, 20000);
  };

  const clearTimer = () => {
    if (autoSaveTimerRef.current) {
      clearInterval(autoSaveTimerRef.current);
      autoSaveTimerRef.current = null;
    }
  };

  const handleSubmit = async (noteId) => {
    const currentLiveValue = liveValueRef.current;
    if (!noteId) {
      const noteRef = push(ref(db, "notes"));
      await set(noteRef, {
        content: currentLiveValue,
        users: [user?.uid],
      })
        .then(() => {
          showSavedMessage();
          startTimer();
        })
        .catch((error) => {
          alert(error.message);
        });

      const _noteId = noteRef.key;
      navigate(`/note/${_noteId}`);
    } else {
      const noteRef = ref(db, `notes/${noteId}`);
      const snapshot = await get(noteRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const existingUsers = data.users || [];

        if (!existingUsers.includes(user.uid)) {
          existingUsers.push(user.uid);
        }
        await update(noteRef, {
          content: currentLiveValue,
          users: existingUsers,
        })
          .then(() => {
            showSavedMessage();
          })
          .catch((error) => {
            alert(error.message);
          });
      }
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
      await update(noteRef, {
        content: newVal,
      }).catch((error) => {
        alert(error.message);
      });
    }
  };

  const handleCursorChange = async (e) => {
    const position = e.target.selectionStart;
    const coordinates = getCaretCoordinates(e.target, position);
    if (noteId) {
      const noteRef = ref(db, `notes/${noteId}/cursors/${user?.uid}`);

      await set(noteRef, {
        name: user?.displayName,
        cursorPositionX: coordinates.left,
        cursorPositionY: coordinates.top,
      }).catch((error) => {
        alert(error.message);
      });
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="relative flex flex-col items-center justify-center h-full gap-10">
        {isSaved && (
          <div className="absolute flex top-16">
            <SavedNotification />
          </div>
        )}
        <div className="relative h-[30rem] w-[35rem] flex justify-center items-center">
          <div className="relative w-96 h-96 flex justify-center">
            <textarea
              className="border border-black w-96 h-96 text-left align-top p-5 caret-red-500  rounded-xl text-black"
              type="text"
              value={liveValue}
              onChange={(e) => liveChange(e)}
              onSelect={handleCursorChange}
            ></textarea>
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
          <HowToUseButton />
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
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Note;
