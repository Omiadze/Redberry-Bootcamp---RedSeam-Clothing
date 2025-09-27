import type { LoginDataTypes } from "../../pages/login/components/types/types";
import { httpClient } from "..";
import type { RegisterDataType } from "../../pages/registration/components/types/types";
import type { LoginResponseType, RegisterResponseType } from "./index.types";
import axios from "axios";
import { AUTH_ENDPOINTS } from "./index.enum";

export const Login = async (
  data: LoginDataTypes
): Promise<LoginResponseType | undefined> => {
  try {
    const result = await httpClient.post(AUTH_ENDPOINTS.SIGN_IN, data);
    return result.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        alert("Your Email or password is incorrect");
      }
      throw new Error(error.response?.data?.message || "Failed to login");
    }
  }
};

export const Register = async (
  data: RegisterDataType | FormData
): Promise<RegisterResponseType | undefined> => {
  try {
    const headers =
      data instanceof FormData
        ? { "Content-Type": "multipart/form-data" }
        : undefined;

    const result = await httpClient.post(AUTH_ENDPOINTS.SIGN_UP, data, {
      headers,
    });
    return result.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Failed to register");
    }
  }
};
