import * as z from "zod";

export const newPasswordSchema = z.object({
  password: z.string().min(1, { message: "Password is required" }),
});

export type NewPasswordSchemaType = z.infer<typeof newPasswordSchema>;
