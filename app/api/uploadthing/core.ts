import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  proofUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 5 },
    pdf: { maxFileSize: "4MB", maxFileCount: 5 },
  }).onUploadComplete(async ({ file }) => {
    return {
      url: file.url,
      name: file.name,
    };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
