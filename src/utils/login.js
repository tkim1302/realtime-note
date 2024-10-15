import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase";

const login = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
        alert(`Hi, ${user.displayName}`);
        return
    }).catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
    })
}

export default login;
