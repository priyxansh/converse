import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";

import type { FileRouter } from "@/app/api/uploadthing/core";

export const UploadButton = generateUploadButton<FileRouter>();
export const UploadDropzone = generateUploadDropzone<FileRouter>();
