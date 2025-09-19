import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    email: z.string().email({ message: "validation.email-invalid" }),
    username: z.string().min(1, { message: "validation.username-required" }),
    password: z.string().min(6, { message: "validation.password-min-6" }),
    password_confirmation: z
      .string()
      .min(6, { message: "validation.password-required" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
  });
