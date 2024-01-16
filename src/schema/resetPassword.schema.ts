import * as z from "zod";

export const resetPasswordSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }),
});

export type ResetPasswordType = z.infer<typeof resetPasswordSchema>;
