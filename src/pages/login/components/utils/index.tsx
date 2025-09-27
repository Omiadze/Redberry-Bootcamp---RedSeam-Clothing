import { useAuthContext } from "../../../../context/auth/hooks";
import type { UserType } from "../../../../context/auth";

export const useAfterLogin = () => {
  const { setUser } = useAuthContext();

  return ({ token, user }: { token?: string; user: UserType }) => {
    localStorage.setItem("accessToken", token || "");
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user); // update context -> header reacts automatically
  };
};
