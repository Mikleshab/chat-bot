import * as process from 'node:process';
import * as Joi from 'joi';

export interface Configuration {
  botToken: string;
  isProduction: boolean;
  webHookUri: string;
}

export const configuration = () => ({
  botToken: process.env.TELEGRAM_BOT_TOKEN,
  isProduction: process.env.NODE_ENV === 'production',
  webHookUri: process.env.WEBHOOK_URI,
});

export const configurationValidationSchema = Joi.object<Configuration, true, Configuration>({
  botToken: Joi.string(),
  isProduction: Joi.boolean(),
  webHookUri: Joi.string(),
});
