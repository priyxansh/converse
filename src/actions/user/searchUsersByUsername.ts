"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

type SearchUsersByUsernameOptions = {
  select?: Prisma.UserSelect;
};

/**
 * Searches for users by their username.
 * @param username - The username to search for.
 * @param options - Additional options for the search.
 * @returns A promise that resolves to an array of users matching the search criteria.
 */
export const searchUsersByUsername = async (
  username: string,
  options: SearchUsersByUsernameOptions = {},
) => {
  const session = await auth();

  if (!session) return redirect("/auth/signin");

  if (!username) return [];

  try {
    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: username,
          mode: "insensitive",
        },
        id: {
          not: session.user.id,
        },
      },
      select: {
        ...options.select,
        password: false,
      },
    });

    return users;
  } catch (error: any) {
    return [];
  }
};
