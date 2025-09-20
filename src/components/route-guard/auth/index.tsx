import type { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const user = localStorage.getItem("user");

  if (user) {
    return <Navigate to="/" />;
  }

  return children || <Outlet />;
};

export default AuthGuard;
