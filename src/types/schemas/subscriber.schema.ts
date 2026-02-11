import z from 'zod';
import subscriberModel from '../../models/subscriber.model.js';

export const SubscribeRequestSchema = z.object({
  email: z.email().refine(
    async (email): Promise<boolean> => {
      const sub = await subscriberModel.findByEmail(email);
      return !sub;
    },
    { error: 'Email already subscribed' },
  ),
});

export type SubscribeRequest = z.infer<typeof SubscribeRequestSchema>;

export const UnsubscribeRequestSchema = z.object({
  email: z.email(),
});

export type UnsubscribeRequest = z.infer<typeof UnsubscribeRequestSchema>;
