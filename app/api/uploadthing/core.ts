import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const uploadRouter = {
  proofUploader: f({
    image: { maxFileSize: "4MB" },
    pdf: { maxFileSize: "8MB" },
  })
    .middleware(async () => {
      return {};
    })
    .onUploadComplete(async ({ file }) => {
      const url = (file as any).url ?? (file as any).ufsUrl ?? "";
      return {
        name: (file as any).name ?? "",
        url,
        type: (file as any).type ?? "",
        size: (file as any).size ?? 0,
      };
    }),
} satisfies FileRouter;

export type UploadRouter = typeof uploadRouter;
