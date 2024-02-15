import { z } from "zod";
import { userCredentialsSchema } from "./userCredentialsSchema";

export const signupFormSchema = userCredentialsSchema
  .extend({
    password: z
      .string({
        required_error: "Password is required",
      })
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z
      .string({
        required_error: "Password confirmation is required",
      })
      .min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
