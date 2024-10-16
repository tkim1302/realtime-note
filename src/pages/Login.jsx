import { useNavigate } from "react-router-dom";
import login from "../utils/login";
import useStore from "../utils/store";
import { useEffect } from "react";

function Login() {
    const { user, setUser, note } = useStore();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const userData = await login();
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
        <button onClick={handleLogin}>
            login
        </button>
    )
}

export default Login