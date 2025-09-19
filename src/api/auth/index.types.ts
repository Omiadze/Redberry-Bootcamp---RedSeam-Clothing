// Base user type
export type UserTypeBase = {
  id: number;
  username: string;
  email: string;
  avatar?: string | null; // optional for login
};

// Login user type
export type LoginUserType = UserTypeBase & {
  is_admin?: number;
  remember_token?: string | null;
};

// Responses
export type LoginResponseType = {
  user: LoginUserType;
  token: string;
};

export type RegisterResponseType = {
  user: UserTypeBase;
  token: string;
};
