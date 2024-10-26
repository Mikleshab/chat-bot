import * as process from 'node:process';
import * as Joi from 'joi';

export interface AuthConfig {
  adminEmail: string;
}

export const configuration = (): Partial<AuthConfig> => ({
  adminEmail: process.env.ADMIN_EMAIL,
});

export const configurationValidationSchema = Joi.object<AuthConfig, true>({
  adminEmail: Joi.string(),
});
