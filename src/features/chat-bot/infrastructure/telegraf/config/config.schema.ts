import * as process from 'node:process';
import * as Joi from 'joi';

export interface Configuration {
  botToken: string;
}

export const configuration = () => ({
  botToken: process.env.TELEGRAM_BOT_TOKEN,
});

export const configurationValidationSchema = Joi.object<Configuration, true, Configuration>({
  botToken: Joi.string(),
});
