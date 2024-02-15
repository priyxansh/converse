"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

type CreateUserOptions = {
  email: string;
  password: string;
  select?: Prisma.UserSelect;
};

/**
 * Create user
 * @param {CreateUserOptions} options - The options to create user
 * @returns Returns the user if created, throws an error if not
 */
export const createUser = async ({
  email,
  password,
  select,
}: CreateUserOptions) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        password: password,
      },
      select,
    });

    return user;
  } catch (error: any) {
    // Error handling will be done in the calling function
    throw error;
  }
};
