import { Navigate } from "react-router-dom";
import useStore from "../utils/store";

const ProtectedRoute = ({ children }) => {
  const user = useStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
