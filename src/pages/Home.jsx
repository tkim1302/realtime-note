import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";
import login from "../utils/login";
import useStore from "../utils/store";
import SignInWithGoogle from "../components/SignInWithGoogle";
import Header from "../components/Header";

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

    const handleLogin = async () => {
        const userData = await login();
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
            <Header title={"home"}/>
            <div className="flex justify-center">
                <div className="flex flex-col justify-center h-screen text-xl">
                    <div>
                        {user ?
                        (<div className="flex gap-12"> 
                            <button className="bg-blue-500 w-36 h-12 rounded-xl" onClick={handleGoToNote}>go to note</button>
                            <button className="bg-blue-500 w-36 h-12 rounded-xl" onClick={handleLogout}>Logout</button>
                        </div>) :
                            <SignInWithGoogle handleLogin={handleLogin} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
