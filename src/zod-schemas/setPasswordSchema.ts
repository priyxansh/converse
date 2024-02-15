import { basePasswordSchema } from "./basePasswordSchema";

export const setPasswordSchema = basePasswordSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  }
);
