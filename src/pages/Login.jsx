import { useNavigate } from "react-router-dom";
import login from "../utils/login";
import useStore
 from "../utils/store";
import { useEffect } from "react";
function Login() {
    const { user, setUser } = useStore();
    const navigate = useNavigate();

    const handleLogin = async () => {
        const userData = await login();
        if(userData) {
            setUser(userData);
            navigate(-2);
        }
    }
    useEffect(() => {
        if(user) {
            navigate(-2);
        }
    }, [user, navigate])
    

    return (
        <button onClick={handleLogin}>
            login
        </button>
    )
}

export default Login
