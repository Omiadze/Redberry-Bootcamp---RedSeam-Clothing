import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    email: z
      .string()
      .min(3, { message: "Email must be at least 3 characters long." })
      .email({ message: "Please enter a valid email address." }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 characters long." }),
    password: z
      .string()
      .min(3, { message: "Password must be at least 3 characters long." }),
    password_confirmation: z
      .string()
      .min(3, { message: "Please confirm your password (min 3 characters)." }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match.",
    path: ["password_confirmation"],
  });
