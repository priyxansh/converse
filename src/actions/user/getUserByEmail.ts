"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type GetUserByEmailOptions = {
  email: string;
  select?: Prisma.UserSelect;
};

/**
 * Get user by email
 * @param {Options} options - The options to get user by email
 * @returns Returns the user if found, null if not
 */
export const getUserByEmail = async ({
  email,
  select,
}: GetUserByEmailOptions) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select,
    });

    return user;
  } catch (error: any) {
    return null;
  }
};
