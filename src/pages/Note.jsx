import { useEffect, useRef, useState } from "react";
import { app } from "../firebase/firebase";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../utils/store";
import SavedNotification from "../components/SavedNotification";
import Header from "../components/Header";

function Note() {
    const { user, setNote } = useStore();
    const navigate = useNavigate();
    const { noteId } = useParams();
    const [liveValue, setLiveValue] = useState("");
    const [userName, setUserName] = useState("");
    const [cursorPosition, setCursorPosition] = useState(0);
    const [isSaved, setIsSaved] = useState(false);
    const liveValueRef = useRef(liveValue);
    const uid = user?.uid || null;
    const name = user?.displayName || null;

    const db = getDatabase(app);

    useEffect(() => {
       liveValueRef.current = liveValue; 
    }, [liveValue])

    useEffect(() => {
        if(!user) {
            alert("login first");
            if(noteId) setNote(noteId);
            navigate("/login");
            return;
        }   
        if(noteId) {
            const noteRef = ref(db, `notes/${noteId}`);
            const unsubscribeNote = onValue(noteRef, (snapshot) => {
                const data = snapshot.val();
                if(data) {
                    setLiveValue(data.content);
                } else {
                    alert("no data");
                }
            });

            const cursorRef = ref(db, `notes/${noteId}/cursors`);
            const unsubscirbeCursors = onValue(cursorRef, (snapshot) => {
                const data = snapshot.val();
                if(data) {
                    const opponentData = Object.entries(data).filter(([key]) => key !== uid); 
                    if(opponentData.length > 0) {
                        setCursorPosition(opponentData[0][1].cursor);
                        setUserName(opponentData[0][1].name);
                    }
                }
            })
            
            return () => {
                unsubscribeNote();
                unsubscirbeCursors();
            }
        }
       
    }, [noteId, user, navigate]);

    useEffect(() => {
        const timerId = setInterval(() => {
            handleSubmit(noteId);
        }, 7000);

        return () => clearInterval(timerId);
    }, [noteId])


    const handleSubmit = async (noteId) => {
        const currentLiveValue = liveValueRef.current;
        if (noteId === undefined) {
            const noteRef = push(ref(db, "notes"));
            await set(noteRef, {
                content : currentLiveValue,
                user : uid,
            }).then(() => {
                showSavedMessage();
            }).catch((error) => {
                alert(error);
            })
            
            const _noteId = noteRef.key;
            navigate(`/note/${_noteId}`);
        }
        else {
            const noteRef = ref(db, `notes/${noteId}`);
            await set(noteRef, {
                content : currentLiveValue,
                user : uid,
            }).then(() => {
                showSavedMessage();
            }).catch((error) => {
                alert(error);
            })
        }
    }

    const showSavedMessage = () => {
        setIsSaved(true);
        setTimeout(() => {
            setIsSaved(false);
        }, 3000);
    }

    const liveChange = async (e) => {
        const newVal = e.target.value;
        setLiveValue(newVal);
        if (noteId !== undefined) {
            const noteRef = ref(db, `notes/${noteId}`);
            await set(noteRef, {
                content : newVal,
            }).catch((error) => {
                alert(error);
            })
        }
    }

    const handleCursorChange = async (e) => {
        const position = e.target.selectionStart;
        const noteRef = ref(db, `notes/${noteId}/cursors/${uid}`);

        await set(noteRef, {
            cursor : position,
            name : name,
        }).catch((error) => {
            alert(error);
        })
    }

    return (
        <div>
            <Header title={"Note"}/>
            <div className="relative flex flex-col items-center justify-center h-screen gap-10">
                {isSaved && 
                <div className="absolute flex top-16">
                    <SavedNotification />
                </div>}
                <textarea 
                className= "border border-black w-96 h-96 text-left align-top caret-blue-500 pl-5 pt-5 pb-5 pr-5 rounded-xl text-black"
                type="text" 
                value={liveValue}
                onChange={(e) => liveChange(e)}
                onSelect={handleCursorChange}
                />
                <div className="text-gray-100">{cursorPosition}</div>
                <div className="text-gray-100 font-bold text-xl">opponent : {userName}</div>
                <div className="flex gap-16">
                    <button
                    className="bg-blue-500 w-24 h-16 rounded-xl"
                    onClick={() => handleSubmit(noteId)}
                    >
                        button
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
    )
}

export default Note
