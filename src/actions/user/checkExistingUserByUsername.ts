"use server";

import { getUserByUsername } from "./getUserByUsername";

/**
 * Check if a user exists by username
 * @param {string} username - The username of the user
 * @returns {boolean} True if the user exists, false if the user does not exist
 */
export const checkExistingUserByUsername = async (username: string) => {
  const existingUser = await getUserByUsername({
    username: username,
    select: {
      id: true,
    },
  });

  if (existingUser) {
    return true;
  }

  return false;
};
