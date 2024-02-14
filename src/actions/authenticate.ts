"use server";

import { signIn } from "@/lib/auth";
import { AuthenticateOptions } from "@/types/auth";
import { checkExistingUserByEmail } from "./checkExistingUserByEmail";
import { userCredentialsSchema } from "@/zod-schemas/userCredentialsSchema";
import prisma from "@/lib/prisma";

/**
 * Authenticates the user
 * @param options - The options to authenticate the user
 * @returns Returns success and error if any
 */
export const authenticate = async (options: AuthenticateOptions) => {
  try {
    if (options.provider === "credentials") {
      // Throw an error if credentials are not provided
      if (!options.credentials) {
        const error = new Error("Credentials not provided");
        error.name = "CredentialsNotProvidedError";
        throw error;
      }

      // Parse the credentials
      const parsedCredentials = await userCredentialsSchema.parseAsync(
        options.credentials
      );

      const { isSignUp } = options;
      const { email, password } = parsedCredentials;

      // Handle sign up
      if (isSignUp) {
        // Check if user with the provided email already exists
        const isUserExisting = await checkExistingUserByEmail(
          options.credentials.email
        );

        // Set error if user already exists
        if (isUserExisting) {
          const error = new Error("User already exists");
          error.name = "UserExistsError";
          throw error;
        }

        // Create new user in the database
        const newUser = await prisma.user.create({
          data: {
            email: email,
            password: password,
          },
        });

        // Sign in the user and store user in session
        await signIn("credentials", {
          id: newUser.id,
          email: newUser.email,
          redirect: true,
          redirectTo: "/auth/complete-profile",
        });

        return {
          success: true,
        };
      }
    }
  } catch (error: any) {
    // Allow server side redirects. Subject to NextJS API changes in future.
    if (error.message === "NEXT_REDIRECT") {
      throw error;
    }

    return {
      success: false,
      error: {
        name: error.name,
        message: error.message,
      },
    };
  }
};
