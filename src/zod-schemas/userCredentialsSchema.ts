import { z } from "zod";
import { basePasswordSchema } from "./basePasswordSchema";

export const userCredentialsSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  password: basePasswordSchema.shape.password,
});
