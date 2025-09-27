import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    email: z.string().email({ message: "Please enter a valid email address." }),
    username: z.string().min(1, { message: "Username is required." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),
    password_confirmation: z
      .string()
      .min(6, { message: "Please confirm your password." }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match.",
    path: ["password_confirmation"],
  });
