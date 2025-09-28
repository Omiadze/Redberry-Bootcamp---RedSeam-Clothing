import { z } from "zod";

export const CheckoutFormSchema = z.object({
  name: z.string().min(3, { message: "First name is required" }),
  surname: z.string().min(3, { message: "Last name is required" }),
  email: z.email({ message: "Please enter a valid email address" }),
  address: z.string().min(3, { message: "Address is required" }),
  zip_code: z.string().regex(/^\d{2,}$/, {
    message: "Zip code must be a number with at least 2 digits",
  }),
});

export type CheckoutFormData = z.infer<typeof CheckoutFormSchema>;
