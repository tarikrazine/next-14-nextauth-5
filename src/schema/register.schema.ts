import * as z from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
