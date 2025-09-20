import type { PropsWithChildren } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProfileGuard: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const user = localStorage.getItem("user");

  if (!user) {
    return <Navigate state={{ from: location }} to="/login" />;
  }

  return children || <Outlet />;
};

export default ProfileGuard;
