import * as process from 'node:process';
import * as Joi from 'joi';

export const DEFAULT_PORT = 3000;

export interface CommonConfiguration {
  port: number;
}

export const commonConfiguration = () => ({
  port: process.env.PORT || DEFAULT_PORT,
});

export const commonConfigurationValidationSchema = Joi.object<CommonConfiguration, true, CommonConfiguration>({
  port: Joi.number(),
});
