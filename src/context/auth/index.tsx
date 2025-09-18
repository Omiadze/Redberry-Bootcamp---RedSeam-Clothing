import {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import { Spin } from "antd";

export type UserType = {
  id: number;
  username: string;
  email: string;
  is_admin?: number;
  remember_token?: string | null;
};

type AuthContextType = {
  user: UserType | null;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      // Build user object from stored values
      const storedUser: UserType = {
        id: Number(localStorage.getItem("userId")),
        username: localStorage.getItem("username") || "",
        email: localStorage.getItem("email") || "",
      };
      setUser(storedUser);
    }

    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {isLoading ? <Spin /> : children}
    </AuthContext.Provider>
  );
};
