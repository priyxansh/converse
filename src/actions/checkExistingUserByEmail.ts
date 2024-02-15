"use server";

import { getUserByEmail } from "./getUserByEmail";

/**
 * Check if a user exists by email
 * @param {string} email - The email of the user
 * @returns {boolean} - True if the user exists, false if the user does not exist
 */
export const checkExistingUserByEmail = async (email: string) => {
  const existingUser = await getUserByEmail({ email });

  if (existingUser) {
    return true;
  }

  return false;
};
