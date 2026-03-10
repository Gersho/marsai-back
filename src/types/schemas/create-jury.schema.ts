import z from 'zod';

export const CreateJurySchema = z.object({
  token: z.string().nonempty(),
  firstname: z.string().nonempty(),
  lastname: z.string().nonempty(),
  password: z.string().nonempty(),
});

export type CreateJury = z.infer<typeof CreateJurySchema>;
