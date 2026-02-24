import type { Request, RequestHandler } from 'express';
import multer, { type FileFilterCallback } from 'multer';
import multerS3 from 'multer-s3';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import {
  ALLOWED_IMAGE_TYPES,
  ALLOWED_VIDEO_TYPES,
  MAX_SIZE,
} from '../helpers/upload-const.js';
import { s3Client } from '../s3Client.js';

interface MulterS3File extends Express.Multer.File {
  location: string;
  key: string;
  bucket: string;
}

const storage = multerS3({
  s3: s3Client,
  bucket: process.env.SCALEWAY_BUCKET_NAME,
  acl: 'public-read',
  contentType: multerS3.AUTO_CONTENT_TYPE,
  key: (_req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const folder = process.env.SCALEWAY_FOLDER;
    const fileName = `${folder}/${file.fieldname}/${uuidv4()}${fileExt}`;
    cb(null, fileName);
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  const imageFields = [
    'coverImage',
    'stillImageA',
    'stillImageB',
    'stillImageC',
  ];

  if (imageFields.includes(file.fieldname)) {
    if (ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          `Invalid image format for ${file.fieldname}. Allowed: .jpg, .png, .webp`,
        ),
      );
    }
  } else if (file.fieldname === 'video') {
    if (ALLOWED_VIDEO_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid video format. Allowed: .mp4, .mkv`));
    }
  } else {
    cb(new Error(`Unexpected field: ${file.fieldname}`));
  }
};

const uploadConfig = multer({
  storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter,
});

export const upload: RequestHandler = (req: Request, res, next) => {
  const uploadFields = uploadConfig.fields([
    { name: 'video', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
    { name: 'stillImageA', maxCount: 1 },
    { name: 'stillImageB', maxCount: 1 },
    { name: 'stillImageC', maxCount: 1 },
  ]);

  uploadFields(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res
        .status(400)
        .json({ message: `Upload Error: ${err.message as string}` });
    } else if (err) {
      return res.status(400).json({ message: 'error on upload' });
    }

    if (!req.files) return next();

    const files = req.files as Record<string, MulterS3File[]>;
    const uploadedFiles: Record<string, string> = {};

    for (const fieldName in files) {
      if (files[fieldName]?.[0]) {
        uploadedFiles[fieldName] = files[fieldName][0].location;
      }
    }

    req.uploadedFiles = uploadedFiles;
    next();
  });
};
