import { USERNAME as usernameRegex } from "@/constants/regex";
import { z } from "zod";

export const completeProfileSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(20, {
      message: "Username must be at most 20 characters long",
    })
    .refine((value) => !value.startsWith("."), {
      message: "Username cannot start with a period",
    })
    .refine((value) => !value.includes(".."), {
      message: "Username cannot contain two consecutive periods",
    })
    .refine((value) => !value.endsWith("."), {
      message: "Username cannot end with a period",
    })
    .refine((value) => /[a-z0-9]/.test(value), {
      message: "Username must contain at least one lowercase letter or number",
    })
    .refine((value) => usernameRegex.test(value), {
      message:
        "Username can only contain lowercase letters, numbers, periods, and underscores",
    }),
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(50, {
      message: "Name must be at most 50 characters long",
    }),
  bio: z
    .string()
    .max(150, {
      message: "Bio must be at most 150 characters long",
    })
    .optional(),
});
