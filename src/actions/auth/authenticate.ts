"use server";

import { signIn } from "@/lib/auth";
import { AuthenticateOptions } from "@/types/auth";
import { checkExistingUserByEmail } from "../user/checkExistingUserByEmail";
import { userCredentialsSchema } from "@/zod-schemas/userCredentialsSchema";
import { getUserByEmail } from "../user/getUserByEmail";
import { createUser } from "../user/createUser";
import { hashPassword } from "./hashPassword";
import { comparePassword } from "./comparePassword";

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

        // Get name and image from the session if available, in case of setting initial password for OAuth user
        const name = options.isOAuthSignUp ? options.credentials.name : null;
        const image = options.isOAuthSignUp ? options.credentials.image : null;

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create new user in the database
        const newUser = await createUser({
          name,
          image,
          email,
          password: hashedPassword,
        });

        // Sign in the user and store user in session
        await signIn("credentials", {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          image: newUser.image,
          redirect: true,
          redirectTo: "/auth/complete-profile",
        });

        return {
          success: true,
        };
      }

      // Handle sign in
      // Get user from the database
      const existingUser = await getUserByEmail({ email });

      // Throw an error if user not found
      if (!existingUser) {
        const error = new Error("User not found");
        error.name = "UserNotFoundError";
        throw error;
      }

      // Check if password is correct
      const isPasswordCorrect = await comparePassword(
        password,
        existingUser.password
      );

      // Set error if password is incorrect
      if (!isPasswordCorrect) {
        const error = new Error("Incorrect password");
        error.name = "IncorrectPasswordError";
        throw error;
      }

      // Sign in and redirect user appropriately
      await signIn("credentials", {
        id: existingUser.id,
        email: existingUser.email,
        redirect: true,
        redirectTo: existingUser.isProfileComplete
          ? "/chat"
          : "/auth/complete-profile",
      });

      return {
        success: true,
      };
    }

    if (options.provider === "github") {
      // Handle GitHub OAuth
      await signIn("github", {
        redirect: true,
        redirectTo: "/auth/complete-profile",
      });

      return {
        success: true,
      };
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
