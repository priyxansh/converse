import { z } from "zod";

export const basePasswordSchema = z.object({
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters long"),
  confirmPassword: z
    .string({
      required_error: "Password confirmation is required",
    })
    .min(8),
});
