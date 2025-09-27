import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Email must be at least 3 characters long." })
    .email({ message: "Please enter a valid email address." }),
  password: z
    .string()
    .min(3, { message: "Password must be at least 3 characters long." }),
});
