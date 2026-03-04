import { z } from 'zod';

export const UpdateEventRequestSchema = z
  .object({
    slug: z.string().optional(),
    status: z.enum(['draft', 'published', 'canceled']).optional(),
    date: z.coerce.date().optional(),
    publishedAt: z.coerce.date().optional(),
    duration: z.int().positive().optional(),
    location: z.string().max(255).optional(),
    isBookable: z.boolean().optional(),
    capacity: z.number().int().positive().optional(),
    // translation fields
    lang: z.enum(['FR', 'EN']).optional(),
    title: z.string().nonempty().optional(),
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      const hasTranslationField =
        data.title !== undefined || data.description !== undefined;
      return !hasTranslationField || data.lang !== undefined;
    },
    {
      message: 'lang is required when updating title or description',
      path: ['lang'],
    },
  );

export type UpdateEventRequest = z.infer<typeof UpdateEventRequestSchema>;
