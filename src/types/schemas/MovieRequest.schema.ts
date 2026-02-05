import z from 'zod';

export const MovieRequestSchema = z.object({
  originalTitle: z.string().min(1).max(255),
  englishTitle: z.string().min(1).max(255),
  youtubeUrl: z.string().url().min(1).max(255),
  coverImage: z.string().url().min(1).max(255),
  duration: z.number().int().positive().max(90),
  isHybrid: z.coerce.boolean().default(false),
  language: z.enum(['FR, EN']),
  originalSynopsis: z.string().min(1).max(300),
  englishSynopsis: z.string().min(1).max(300),
  creativeProcess: z.string().min(1).max(300),
  iaTools: z.string().min(1).max(300),
  hasSubs: z.boolean(),
  srt: z.string().max(255),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
});

export type MovieRequest = z.infer<typeof MovieRequestSchema>;
