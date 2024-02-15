import { z } from "zod";
import { basePasswordSchema } from "./basePasswordSchema";

export const setPasswordSchema = z
  .object({
    password: basePasswordSchema.shape.password.regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
    confirmPassword: basePasswordSchema.shape.confirmPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
