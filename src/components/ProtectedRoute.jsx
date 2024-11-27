import { Navigate } from "react-router-dom";
import useStore from "../utils/store";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const user = useStore((state) => state.user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ProtectedRoute;
