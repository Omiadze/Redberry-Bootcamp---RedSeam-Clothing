import { setAuthorizationHeader } from "../../../../api";
import type { UserType } from "../../../../context/auth";

export const AfterLoginSuccessn = ({
  token,
  user,
}: {
  token: string | undefined;
  user: UserType;
}) => {
  localStorage.setItem("accessToken", token || "");
  localStorage.setItem("user", JSON.stringify(user));
  setAuthorizationHeader(`Bearer ${token}`);
};
