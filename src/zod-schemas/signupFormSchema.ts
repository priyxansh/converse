import { z } from "zod";
import { userCredentialsSchema } from "./userCredentialsSchema";

export const signupFormSchema = userCredentialsSchema
  .extend({
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
