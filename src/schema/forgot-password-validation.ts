import { z } from 'zod';

const ForgotPasswordSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(20, { message: 'Username must be no more than 20 characters' })
    .regex(
      /^[a-zA-Z0-9.]+$/,
      'Username must only contain letters, numbers or a period',
    ),
});

export { ForgotPasswordSchema };
