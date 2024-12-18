import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: any;
}

export const UseProtectedRoute = () => {
  const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const user = localStorage.getItem("USER_OBJ");
    if (!user) {
      return <Navigate to="/home" replace />;
    }
    return children;
  };

  return {
    ProtectedRoute,
  };
};
