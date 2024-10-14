import { useState } from "react";
import { app } from "../firebase/firebase";
import { getDatabase, ref, set, push } from "firebase/database";

function Note() {
    const [inputValue, setInputValue] = useState("");

    const saveData = async () => {
        const db = getDatabase(app);
        const newDoc = push(ref(db, "notes"));
        set(newDoc, {
            note : inputValue,
        }).then(() => {
            alert("succeeded");
        }).catch((error) => {
            alert(error);
        })
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
            onClick={saveData}>
                button
            </button>
        </div>
    )
}

export default Note
