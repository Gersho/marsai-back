import { DeleteObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '../s3Client.js';
import type { Request } from 'express';
import type MulterS3File from '../types/interfaces/multer-file.interface.js';

export const removeUploads = async (req: Request): Promise<void> => {
  if (!req.uploadedFiles) return;

  console.info('Removing files from s3');

  const files = Object.values(req.uploadedFiles) as MulterS3File[];

  console.info(
    'files to remove: ',
    files.map((f) => f.key),
  );

  const deletePromises = files.map(async (file) => {
    try {
      if (!file || !file.key || !file.bucket) {
        console.warn(
          'Skipping deletion: Invalid file object missing key or bucket.',
          file,
        );
        return;
      }

      const command = new DeleteObjectCommand({
        Bucket: file.bucket,
        Key: file.key,
      });

      await s3Client.send(command);
      console.info(`Successfully deleted from S3: ${file.key}`);
    } catch (error) {
      console.error(`Error deleting file from S3 (${file.key}):`, error);
    }
  });

  await Promise.all(deletePromises);
};
