import type { Attachment } from "resend";

export const BOOKING_IMAGE_MAX_COUNT = 10;
export const BOOKING_IMAGE_MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
export const BOOKING_IMAGE_MAX_TOTAL_SIZE_BYTES = 20 * 1024 * 1024;

const ALLOWED_BOOKING_IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

export interface PreparedBookingImages {
  attachments: Attachment[];
  attachmentNames: string[];
  totalSizeBytes: number;
}

const sanitizeFileName = (fileName: string, index: number) => {
  const trimmedName = fileName.trim();
  const fallbackName = `photo-${index + 1}`;
  const safeName = trimmedName.length > 0 ? trimmedName : fallbackName;
  const lastDotIndex = safeName.lastIndexOf(".");
  const baseName = lastDotIndex > 0 ? safeName.slice(0, lastDotIndex) : safeName;
  const rawExtension = lastDotIndex > 0 ? safeName.slice(lastDotIndex) : "";
  const extension = rawExtension
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, "")
    .slice(0, 10);
  const normalizedBaseName = baseName
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

  return `${normalizedBaseName || fallbackName}${extension}`;
};

export async function prepareBookingImageAttachments(
  files: File[],
): Promise<PreparedBookingImages> {
  if (files.length > BOOKING_IMAGE_MAX_COUNT) {
    throw new Error(
      `Vous pouvez envoyer jusqu'a ${BOOKING_IMAGE_MAX_COUNT} images maximum.`,
    );
  }

  let totalSizeBytes = 0;

  files.forEach((file) => {
    if (!ALLOWED_BOOKING_IMAGE_TYPES.has(file.type)) {
      throw new Error(
        "Formats d'image acceptes: JPG, PNG, WEBP et GIF.",
      );
    }

    if (file.size > BOOKING_IMAGE_MAX_FILE_SIZE_BYTES) {
      throw new Error(
        `Chaque image doit faire moins de ${Math.floor(
          BOOKING_IMAGE_MAX_FILE_SIZE_BYTES / (1024 * 1024),
        )} Mo.`,
      );
    }

    totalSizeBytes += file.size;
  });

  if (totalSizeBytes > BOOKING_IMAGE_MAX_TOTAL_SIZE_BYTES) {
    throw new Error(
      `La taille totale des images doit rester sous ${Math.floor(
        BOOKING_IMAGE_MAX_TOTAL_SIZE_BYTES / (1024 * 1024),
      )} Mo.`,
    );
  }

  const attachments = await Promise.all(
    files.map(async (file, index) => ({
      filename: sanitizeFileName(file.name, index),
      content: Buffer.from(await file.arrayBuffer()).toString("base64"),
      contentType: file.type,
    })),
  );

  return {
    attachments,
    attachmentNames: attachments
      .map((attachment) => attachment.filename)
      .filter((fileName): fileName is string => typeof fileName === "string"),
    totalSizeBytes,
  };
}