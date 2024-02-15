"use server";

import { compare } from "bcrypt";

/**
 * Compares the password with the hashed password
 * @param password - The password to compare
 * @param hashedPassword - The hashed password
 * @returns Returns true if password is correct, false otherwise
 */

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const isPasswordCorrect = await compare(password, hashedPassword);
  return isPasswordCorrect;
};
