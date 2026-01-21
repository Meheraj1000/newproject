import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // ✅ Wait for auth check
    return (
      <div className="flex justify-center items-center min-h-screen">
        লোড হচ্ছে...
      </div>
    );
  }

  if (!user) { // todo : check logic
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default PrivateRoute;
