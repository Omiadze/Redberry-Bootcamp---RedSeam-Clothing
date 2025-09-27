import { useContext } from "react";
import { AuthContext } from "..";

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Must be used inside AuthProvider");
  return context;
};
