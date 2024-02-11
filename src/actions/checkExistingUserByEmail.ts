"use server";

import prisma from "@/lib/prisma";

/**
 * Check if a user exists by email
 * @param {string} email - The email of the user
 * @returns {boolean | undefined} - True if the user exists, false if the user does not exist, undefined if an error occurs
 */
export const checkExistingUserByEmail = async (email: string) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return true;
    }

    return false;
  } catch (error: any) {
    return undefined;
  }
};
