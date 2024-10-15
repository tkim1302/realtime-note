import { useEffect, useState } from "react";
import { app } from "../firebase/firebase";
import { getDatabase, ref, set, push, onValue } from "firebase/database";
import { useNavigate, useParams } from "react-router-dom";

function Note() {
    const navigate = useNavigate();
    const { noteId } = useParams();

    const [inputValue, setInputValue] = useState("");
    const db = getDatabase(app);

    useEffect(() => {
        if(noteId) {
            const noteRef = ref(db, `notes/${noteId}`);

            const unsubscribe = onValue(noteRef, (snapshot) => {
                const data = snapshot.val();
                if(data) {
                    setInputValue(data.content);
                } else {
                    alert("no data");
                }
            });
    
            return () => unsubscribe();
        }
       
    }, [noteId]);

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
            const noteRef = ref(db, `notes/${noteId}`)
            await set(noteRef, {
                content : inputValue,
            }).then(() => {
                alert("update succeeded");
            }).catch((error) => {
                alert(error);
            })
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-10">
            <textarea 
            className=" border border-black w-96 h-96 text-left align-top caret-blue-500 pl-5 pt-5 pb-5 pr-5" 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}/>
            <button
            className="bg-blue-500 w-24 h-16 rounded-xl"
            onClick={handleSubmit}>
                button
            </button>
        </div>
    )
}

export default Note
