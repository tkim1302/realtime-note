import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import login from "../utils/login";
import useStore from "../utils/store";

function Home() {
    const { user, setUser } = useStore();
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

    const handleLogin = () => {
        const userData = login();
        if(userData) setUser(userData);
    }

    const handleGoToNote = () => {
        navigate("/note/new");
    }

    const handleLogout = () => {
        signOut(auth);
        setUser(null);
    }

    return (
        <div>
            <h2>Homepage</h2>
            <button onClick={handleLogin}>Sign In With Google</button>
            {user && "logged in"}
            <div>
                <button onClick={handleGoToNote}>go to note</button>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    )
}

export default Home;
