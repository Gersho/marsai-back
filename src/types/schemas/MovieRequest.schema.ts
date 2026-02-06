import z from 'zod';
import {
  ALLOWED_IMAGE_TYPES,
  MAX_IMAGE_SIZE,
} from '../../helpers/upload-const.js';

const ImageFileSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  mimetype: z.enum(ALLOWED_IMAGE_TYPES),
  size: z
    .number()
    .max(MAX_IMAGE_SIZE, { message: 'File size must be less than 15MB.' }),
  path: z.string(),
});

export const MovieRequestSchema = z.object({
  originalTitle: z.string().min(1).max(255),
  englishTitle: z.string().min(1).max(255),
  youtubeUrl: z.string().url().min(1).max(255),
  coverImage: z.array(ImageFileSchema).nonempty(),
  stillImageA: z.array(ImageFileSchema).nullish(),
  stillImageB: z.array(ImageFileSchema).nullish(),
  stillImageC: z.array(ImageFileSchema).nullish(),
  duration: z.coerce.number().int().positive().max(90),
  isHybrid: z.coerce.boolean().default(false),
  language: z.enum(['FR', 'EN']),
  originalSynopsis: z.string().min(1).max(300),
  englishSynopsis: z.string().min(1).max(300),
  creativeProcess: z.string().min(1).max(300),
  aiTools: z.string().min(1).max(300),
  hasSubs: z.coerce.boolean(),
});

export type MovieRequest = z.infer<typeof MovieRequestSchema>;
