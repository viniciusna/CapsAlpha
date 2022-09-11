import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ user, children }) => {
    if (!user) {
      return <Navigate to="/home" replace />;
    }
  
    return children;
};


export default ProtectedRoute