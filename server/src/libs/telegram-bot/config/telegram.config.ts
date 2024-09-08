import * as process from 'node:process';
import * as Joi from 'joi';

export interface TelegramConfiguration {
  botToken: string;
}

export const telegramConfiguration = () => ({
  botToken: process.env.TELEGRAM_BOT_TOKEN,
});

export const telegramConfigurationValidationSchema = Joi.object<TelegramConfiguration, true, TelegramConfiguration>({
  botToken: Joi.string(),
});
