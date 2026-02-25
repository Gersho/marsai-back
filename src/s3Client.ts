import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
  region: process.env.SCALEWAY_REGION,
  credentials: {
    accessKeyId: process.env.SCALEWAY_ACCESS_KEY!,
    secretAccessKey: process.env.SCALEWAY_SECRET_KEY!,
  },
  endpoint: process.env.SCALEWAY_ENDPOINT,
  forcePathStyle: true,
});
