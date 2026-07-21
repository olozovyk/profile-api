import * as z from 'zod';

const envVars = z.object({
  PORT: z.coerce.number().default(8080),
  DB_USER: z.string(),
  DB_PASSWORD: z.string(),
  DB_NAME: z.string(),
});

export type EnvVars = z.infer<typeof envVars>;

export const validate = (config: Record<string, unknown>) => {
  return envVars.parse(config);
};
