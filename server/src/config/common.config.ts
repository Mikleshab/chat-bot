import * as process from 'node:process';
import * as Joi from 'joi';

export const DEFAULT_PORT = 3000;
export const DEFAULT_DROP_SCHEMA = false;

export interface CommonConfiguration {
  port: number;
  dropSchema: boolean;
}

export const commonConfiguration = () => ({
  port: process.env.PORT,
  dropSchema: process.env.DROP_SCHEMA === 'true',
});

export const commonConfigurationValidationSchema = Joi.object<CommonConfiguration, true, CommonConfiguration>({
  port: Joi.number().default(DEFAULT_PORT),
  dropSchema: Joi.boolean().default(DEFAULT_DROP_SCHEMA)
});
