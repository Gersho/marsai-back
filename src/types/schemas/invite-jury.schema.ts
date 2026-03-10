import z from 'zod';

const JuryInviteSchema = z.object({
  email: z.email(),
});

// export const JuryInviteRequestSchema = z.array(JuryInviteSchema).nonempty();
export const JuryInviteRequestSchema = z.object({
  juries: z.array(JuryInviteSchema).nonempty(),
});

export type JuryInviteRequest = z.infer<typeof JuryInviteRequestSchema>;
