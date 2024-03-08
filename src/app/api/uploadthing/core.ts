import { auth } from "@/lib/auth";
import {
  createUploadthing,
  type FileRouter as UtFileRouter,
} from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// FileRouter for the app, can contain multiple FileRoutes
export const fileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
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
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);

      console.log("file url", file.url);

      // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
      return { uploadedBy: metadata.userId };
    }),
} satisfies UtFileRouter;

export type FileRouter = typeof fileRouter;
