import * as z from "zod";

export const settingsSchema = z.object({
  name: z.optional(z.string()),
  email: z.optional(z.string()),
  password: z.optional(
    z.string().min(6, { message: "Password must be at least 6 characters" }),
  ),
  newPassword: z.optional(
    z.string().min(6, {
      message: "New password must be at least 6 characters",
    }),
  ),
  isTwoFactorEnabled: z.optional(z.boolean()),
  role: z.enum(["ADMIN", "USER"]),
}).refine((data) => {
  if (data.password && !data.newPassword) {
    return false;
  }

  return true;
}, { message: "New password is required", path: ["newPassword"] }).refine(
  (data) => {
    if (data.newPassword && !data.password) {
      return false;
    }

    return true;
  },
  { message: "Password is required", path: ["password"] },
);

export type SettingsSchemaType = z.infer<typeof settingsSchema>;
