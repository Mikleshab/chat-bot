import * as process from 'node:process';
import * as Joi from 'joi';

export interface AuthConfig {
  googleClientId: string;
  adminEmail: string;
}

export const configuration = (): Partial<AuthConfig> => ({
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  adminEmail: process.env.ADMIN_EMAIL,
});

export const configurationValidationSchema = Joi.object<AuthConfig, true>({
  googleClientId: Joi.string(),
  adminEmail: Joi.string(),
});
