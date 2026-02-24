import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../s3Client.js';
import type { Request } from 'express';

export const removeUploads = async (req: Request): Promise<void> => {
  if (!req.uploadedFiles) return;

  const allUrls = Object.values(req.uploadedFiles).flat();

  const deletePromises = allUrls.map(async (url) => {
    try {
      if (!url || typeof url !== 'string') return;

      const bucketName = process.env.SCALEWAY_BUCKET_NAME;
      const urlParts = url.split(`${bucketName}/`);
      const key = urlParts[1];

      if (!key) {
        console.error(`Could not extract key from URL: ${url}`);
        return;
      }

      const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: key,
      });

      await s3Client.send(command);
      console.info(`Successfully deleted from S3: ${key}`);
    } catch (error) {
      console.error(`Error deleting file from S3 (${url}):`, error);
    }
  });

  await Promise.all(deletePromises);
};
