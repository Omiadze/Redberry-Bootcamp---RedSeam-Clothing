// Updated RegisterDataType to properly handle optional avatar
export type RegisterDataType = {
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
};

// For API calls that include avatar
export type RegisterWithAvatarType = RegisterDataType & {
  avatar: File;
};

// Or if you prefer a single type with optional avatar:
export type RegisterFormDataType = {
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
  avatar?: File;
};
