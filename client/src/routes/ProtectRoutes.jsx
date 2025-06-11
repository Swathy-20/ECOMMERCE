import { Navigate, Outlet } from "react-router-dom";

export const ProtectRoutes = () => {
  const authUser = localStorage.getItem("authUser");

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
