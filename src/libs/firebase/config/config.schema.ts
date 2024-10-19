import * as process from 'node:process';
import * as Joi from 'joi';
import * as admin from 'firebase-admin';

export const configuration = (): admin.ServiceAccount => ({
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
});

export const configurationValidationSchema = Joi.object<admin.ServiceAccount, true, admin.ServiceAccount>({
  projectId: Joi.string(),
  clientEmail: Joi.string(),
  privateKey: Joi.string(),
});
