"use server";

import { hash, genSalt } from "bcrypt";

/**
 * Hashes the password
 * @param password - The password to hash
 * @returns Returns the hashed password
 */
export const hashPassword = async (password: string) => {
  const salt = await genSalt(10);
  const hashed = await hash(password, salt);
  return hashed;
};
