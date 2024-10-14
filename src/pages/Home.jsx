import { useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

function Home() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if(user) {
          setUser(user);
          return;
        }
        setUser(null);
      });
      return () => unsubscribe();
    }, []);

    const SignInWithGoogle = () => {

        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            alert(`Hi, ${user.displayName}`)
            navigate("/");
        }).catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage);
        })
    }

    const handleGoToNote = () => {
        navigate("/note");
    }

    const handleLogout = () => {
        signOut(auth);
        setUser(null);
    }

    return (
        <div>
            <h2>Homepage</h2>
            <button onClick={SignInWithGoogle}>Sign In With Google</button>
            {!user && 
            <div>
                <button onClick={handleGoToNote}>go to note</button>
                <button onClick={handleLogout}>Logout</button>
            </div>}
        </div>
    )
}

export default Home;
