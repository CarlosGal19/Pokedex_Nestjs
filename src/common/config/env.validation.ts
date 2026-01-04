import * as z from 'zod';

export const ZodEnvSchema = z.object({
  MONGO_DB_URI: z.string().trim().startsWith('mongodb'),
  PORT: z.coerce.number(),
  DEFAULT_LIMIT: z.coerce.number(),
});
