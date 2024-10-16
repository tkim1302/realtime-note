import { get, getDatabase, ref } from "firebase/database";
import { useNavigate } from "react-router-dom"
import { app } from "../firebase/firebase";
import useStore from "../utils/store";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";

function NoteList() {
    const { user } = useStore();
    const navigate = useNavigate();
    const uid = user?.uid || null;
    const db = getDatabase(app);
    const [notes, setNotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if(uid) {
            const listRef = ref(db, "notes/");
            
            get(listRef).then((snapshot) => {
                const data = snapshot.val();
                if(data) {
                    const noteList = Object.entries(data).filter(([key, note]) => (
                        note.user === uid
                    ));
                    setNotes(noteList);
                    setIsLoading(false);
                }
                else {
                    alert("no data");
                    setIsLoading(false);
                }
            }).catch((error) => {
                alert(error);
            })
        }
        else {
            if(!user) {
                alert("login first");
                navigate("/login");
                return;
            }   
        }
    }, [uid, db]);

    const handleClickNote = (noteId) => {
        navigate(`/note/${noteId}`);
    }

    return (
        <div className="flex justify-center mt-24 gap">
            <div className="flex flex-col gap-24">
                <div className="grid grid-cols-4 gap-12">
                    {isLoading ? ( <Loading /> ) :
                    (notes.length > 0 ? (
                    notes.map(([noteId, note]) => (
                            <div key={noteId} className="w-36 h-36 bg-blue-500 cursor-pointer" onClick={() => handleClickNote(noteId)}>
                                <p className="break-words whitespace-normal">{note.content}</p>
                            </div>
                        ))
                        ) : (
                        <p>No notes found</p>
                    ))}
                </div>
                <button onClick={() => navigate(-1)}>go back</button>
            </div>
        </div>
    )
}

export default NoteList
