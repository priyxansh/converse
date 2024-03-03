import { userCredentialsSchema } from "./userCredentialsSchema";
import { basePasswordSchema } from "./basePasswordSchema";
import { PASSWORD as passwordRegex } from "@/constants/regex";

export const signupFormSchema = userCredentialsSchema
  .extend({
    password: basePasswordSchema.shape.password.regex(
      passwordRegex,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
    confirmPassword: basePasswordSchema.shape.confirmPassword,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
