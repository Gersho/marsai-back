import z from "zod";

export const MovieRequestSchema = z.object({
    originalTitle: z.string().min(1),
    englishTitle: z.string().min(1),
    youtubeUrl: z.string().url(),
    coverImage: z.string().url(),
    duration: z.number().int().positive(),
    isHybrid: z.coerce.boolean().default(false),
    language: z.enum(["FR, EN"]),
    originalSynopsis: z.string().min(1),
    englishSynopsis: z.string().min(1),
    creativeProcess: z.string().min(1),
    iaTools: z.string().min(1),
    hasSubs: z.boolean(),
    srt: z.string(),
    status: z.enum(["draft","published","archived"]).default("draft")
})

export type MovieRequest = z.infer<typeof MovieRequestSchema>;