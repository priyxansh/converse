import { refreshSession } from "@/actions/auth/refreshSession";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  createUploadthing,
  type FileRouter as UtFileRouter,
} from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for the app, can contain multiple FileRoutes
export const fileRouter = {
  avatarUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on server before upload
      const session = await auth();

      if (!session) {
        throw new UploadThingError("Unauthorized");
      }

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Server side code to run after the file is uploaded
      // Save the file to the database
      await prisma.user.update({
        where: { id: metadata.userId },
        data: {
          avatarKey: file.key,
          image: file.url,
        },
      });

      // Returned data sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies UtFileRouter;

export type FileRouter = typeof fileRouter;
