"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type GetUserByUsernameOptions = {
  username: string;
  select?: Prisma.UserSelect;
};

/**
 * Get user by username
 * @param {Options} options - The options to get user by username
 * @returns Returns the user if found, null if not
 */
export const getUserByUsername = async ({
  username,
  select,
}: GetUserByUsernameOptions) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
      select,
    });

    return user;
  } catch (error: any) {
    return null;
  }
};
