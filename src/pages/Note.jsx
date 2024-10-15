import { useEffect, useState } from "react";
import { app } from "../firebase/firebase";
import { getDatabase, ref, set, push, onValue, get } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";
import useStore from "../utils/store";

function Note() {
    const { user, setUser } = useStore();
    const navigate = useNavigate();
    const { noteId } = useParams();
    const [inputValue, setInputValue] = useState("");
    const [liveValue, setLiveValue] = useState("");
    const [cursorPosition, setCursorPosition] = useState(0);
    const uid = user?.uid || null;

    const db = getDatabase(app);

    useEffect(() => {
        if(!user) {
            alert("login first");
            navigate("/login");
            return;
        }   
        if(noteId) {
            const noteRef = ref(db, `notes/${noteId}`);
            const unsubscribeNote = onValue(noteRef, (snapshot) => {
                const data = snapshot.val();
                if(data) {
                    setInputValue(data.content);
                    setLiveValue(data.content);
                } else {
                    alert("no data");
                }
            });
            
            return () => unsubscribeNote();
        }
       
    }, [noteId, user, navigate]);

    const handleSubmit = async () => {
        if (noteId === undefined) {
            const noteRef = push(ref(db, "notes"));
            await set(noteRef, {
                content : inputValue,
            }).then(() => {
                alert("succeeded");
            }).catch((error) => {
                alert(error);
            })
            
            const noteId = noteRef.key;
            navigate(`/note/${noteId}`);
        }
        else {
            setInputValue(liveValue);
            const noteRef = ref(db, `notes/${noteId}`);
            await set(noteRef, {
                content : inputValue,
            }).then(() => {
                alert("update succeeded");
            }).catch((error) => {
                alert(error);
            })
        }
    }

    const liveChange = async (e) => {
        const newVal = e.target.value;
        setLiveValue(newVal);
        if (noteId === undefined) {
            setInputValue(newVal);
        }
        else {
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
        const noteRef = ref(db, `notes/${noteId}`);
        const snapshot = await get(noteRef);
        const data = snapshot.val();
        const content = data?.content || "";

        await set(noteRef, {
            content : content,
            cursor : position,
        }).catch((error) => {
            alert(error);
        })
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-10">
            <textarea 
            className=" border border-black w-96 h-96 text-left align-top caret-blue-500 pl-5 pt-5 pb-5 pr-5" 
            type="text" 
            value={liveValue}
            onChange={(e) => liveChange(e)}
            onSelect={handleCursorChange}
            />
            <button
            className="bg-blue-500 w-24 h-16 rounded-xl"
            onClick={handleSubmit}>
                button
            </button>
        </div>
    )
}

export default Note
