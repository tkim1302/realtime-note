import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase";

const login = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
        alert(`Hi, ${user.displayName}`);
        return user;
    }).catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
    })
}

export default login;
