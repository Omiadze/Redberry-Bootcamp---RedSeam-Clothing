export type RegisterResponseType = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};
export type UserType = {
  id: number;
  username: string;
  email: string;
  is_admin?: number;
  remember_token?: string | null;
};

export type LoginResponseType = {
  user: UserType;
  token: string;
};

export type RefreshPayload = {
  payload: {
    refresh: string | null;
  };
};
