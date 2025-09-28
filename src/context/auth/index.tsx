import {
  createContext,
  useState,
  useEffect,
  type PropsWithChildren,
} from "react";
import { Spin } from "antd";

export type UserType = {
  id: number;
  username: string;
  email: string;
  is_admin?: number;
  remember_token?: string | null;
  avatar?: string | null;
};

type AuthContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
      setUser(JSON.parse(userStr));
    }

    setIsLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {isLoading ? <Spin /> : children}
    </AuthContext.Provider>
  );
};
