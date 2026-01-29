import z from 'zod';

export const AuthRequest = z.object({
  email: z.email(),
  password: z.string().nonempty(),
});

export type AuthRequest = z.infer<typeof AuthRequest>;
