import * as process from 'node:process';
import * as Joi from 'joi';


export interface GoogleConfiguration {
  googleApplicationCredentials: string;
  spreadsheetId: string;
  greetingsSheetName: string;
  greetingsSheetRange: string;
}

export const googleConfiguration = () => ({
  googleApplicationCredentials: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
  greetingsSheetName: process.env.GREETINGS_SHEET_NAME,
  greetingsSheetRange: process.env.GREETINGS_SHEET_RANGE,
});

export const googleConfigurationValidationSchema = Joi.object<GoogleConfiguration, true, GoogleConfiguration>({
  googleApplicationCredentials: Joi.string(),
  spreadsheetId: Joi.string(),
  greetingsSheetName: Joi.string(),
  greetingsSheetRange: Joi.string(),
});
