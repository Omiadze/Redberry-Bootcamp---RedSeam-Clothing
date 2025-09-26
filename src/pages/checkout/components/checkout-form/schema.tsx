import { z } from "zod";

export const CheckoutFormSchema = z.object({
  name: z.string().min(1, { message: "First name is required" }),
  surname: z.string().min(1, { message: "Last name is required" }),
  email: z.email({ message: "Please enter a valid email address" }),
  address: z.string().min(1, { message: "Address is required" }),
  zip_code: z.string().min(1, { message: "Zip code is required" }),
});

export type CheckoutFormData = z.infer<typeof CheckoutFormSchema>;
