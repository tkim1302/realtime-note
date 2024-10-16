import { get, getDatabase, ref } from "firebase/database";
import { useNavigate } from "react-router-dom"
import { app } from "../firebase/firebase";
import useStore from "../utils/store";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Header from "../components/Header";

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
        <div>
            <Header title={"Note List"}/>
            <div className="flex justify-center mt-24 gap">
                <div className="flex flex-col gap-24">
                    <div className="grid grid-cols-3 gap-12">
                        {isLoading ? ( <Loading /> ) :
                        (notes.length > 0 ? (
                        notes.map(([noteId, note]) => (
                                <div key={noteId} className="transition ease-in-out hover:-translate-y-3 hover:scale-110 w-56 h-56 bg-white text-black rounded-xl cursor-pointer pt-5 pl-2 pr-2 pb-2" onClick={() => handleClickNote(noteId)}>
                                    <p className="break-words whitespace-normal">{note.content}</p>
                                </div>
                            ))
                            ) : (
                            <p>No notes found</p>
                        ))}
                    </div>
                    <button className="bg-blue-500 w-36 h-12 rounded-xl" onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>
        </div>
    )
}

export default NoteList
