"use server";

import { completeProfileSchema } from "@/zod-schemas/completeProfileSchema";
import { z } from "zod";
import { checkExistingUserByUsername } from "./checkExistingUserByUsername";
import prisma from "@/lib/prisma";
import { auth, signIn } from "@/lib/auth";

/**
 * Completes the user profile by updating the user data in the database
 * @param data - The data to complete the profile
 * @returns Returns success and error if any
 */
export const completeProfile = async (
  data: z.infer<typeof completeProfileSchema>
) => {
  try {
    const session = await auth();

    if (!session) {
      throw new Error("User is not authenticated");
    }

    // Validate the data
    await completeProfileSchema.parseAsync(data);

    const { username, name, image, bio } = data;

    // Check if the username already exists
    const exists = await checkExistingUserByUsername(username);

    // Throw an error if the username already exists
    if (exists) {
      const error = new Error("Username already exists");
      error.name = "UsernameExistsError";
      throw error;
    }

    // Update data in the database
    const user = await prisma.user.update({
      data: {
        username,
        name,
        image,
        bio,
        isProfileComplete: true,
      },
      where: {
        id: session.user.id,
      },
    });

    // Since next-auth v5 doesn't offer a stable way to update the session, we have to sign the user in again
    await signIn("credentials", {
      id: user.id,
      email: user.email,
      redirect: false,
    });

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        name: error.name,
        message: error.message,
      },
    };
  }
};
