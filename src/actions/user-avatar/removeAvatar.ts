"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { refreshSession } from "../auth/refreshSession";
import { utapi } from "@/lib/uploadthing";
/**
 * Removes the logged in user's avatar
 * @returns {Promise<boolean>} - A promise that resolves to true if the user's avatar was removed successfully, and false otherwise
 */
export const removeAvatar = async () => {
  const session = await auth();

  if (!session) {
    throw new Error("User is not authenticated");
  }

  try {
    // Remove the user's avatar in the database
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: null,
        avatarKey: null,
      },
    });

    // Remove avatar from UploadThing bucket
    if (session.user.avatarKey) {
      const deleteFilesResult = await utapi.deleteFiles(
        session.user.avatarKey as string
      );

      if (!deleteFilesResult.success) {
        const error = new Error("Failed to remove the avatar from the bucket.");
        error.name = "AvatarRemovalError";
        throw error;
      }
    }

    // Refresh session
    const refreshSessionResult = await refreshSession();

    if (!refreshSessionResult.success) {
      const error = new Error("Failed to refresh the session");
      error.name = "SessionRefreshError";
    }

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      error: {
        name: error.name,
        message: error.message,
      },
    };
  }
};
