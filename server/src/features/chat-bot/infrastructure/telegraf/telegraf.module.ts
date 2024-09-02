import * as process from 'node:process';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration, configurationValidationSchema } from './config/config.schema';
import { SenderService } from './services/sender.service';
import { EventHandler } from './services/event.handler';
import { CommandHandler } from './services/command.handler';
import { CallbackHandler } from './services/callback.handler';
import { BotRepository } from '../../application/repositories/bot.repository';
import { BOT_REPOSITORY_PROVIDER } from './providers/bot.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: configurationValidationSchema,
      envFilePath: [`.env.${process.env.NODE_ENV}.local`],
    }),
  ],
  providers: [BOT_REPOSITORY_PROVIDER, SenderService, EventHandler, CommandHandler, CallbackHandler],
  exports: [BotRepository],
})
export class TelegrafModule {}
