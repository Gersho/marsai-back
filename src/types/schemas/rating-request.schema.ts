import z from 'zod';

export const RatingRequestSchema = z.object({
  movieId: z.number().int().positive(),
  rating: z.number().int().gte(1).lte(10),
});

export type RatingRequest = z.infer<typeof RatingRequestSchema>;
