import { useNavigate } from "react-router-dom";
import login from "../utils/login";
import useStore from "../utils/store";
import { useEffect, useState } from "react";
import SignInWithGoogle from "../components/SignInWithGoogle";
import Loading from "../components/Loading";

function Login() {
    const { user, setUser, note } = useStore();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);


    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const userData = await login();
        setIsLoading(false);
        if(userData) {
            setUser(userData);
            if(note) {
                navigate(`/note/${note}`);
            }
            else {
                navigate("/");
            }
        }
    }
    useEffect(() => {
        if(user) {
            if(note) {
                navigate(`/note/${note}`);
            }
            else {
                navigate("/");
            }
        }
    }, [user, navigate, note])
    
    return (
        <div className="flex justify-center">
            <div className="flex flex-col justify-center h-screen text-xl">
                {!isLoading ? <SignInWithGoogle handleLogin={handleLogin} /> : <Loading />}
            </div>
        </div>
    )
}

export default Login
