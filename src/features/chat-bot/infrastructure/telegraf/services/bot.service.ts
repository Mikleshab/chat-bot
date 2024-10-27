import { Configuration } from '@features/chat-bot/infrastructure/telegraf/config/config.schema';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { defer, timer } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Telegraf } from 'telegraf';

@Injectable()
export class BotService {
  private bot!: Telegraf;

  constructor(private configService: ConfigService<Configuration>) {
    this.initializeBot();
  }

  getBot() {
    return this.bot;
  }

  private initializeBot() {
    this.bot = new Telegraf(this.configService.get<Configuration['botToken']>('botToken', ''), {
      handlerTimeout: 30000,
    });
  }

  private tryLaunchBot() {
    return defer(() =>
      this.configService.get<Configuration['isProduction']>('isProduction', false)
        ? this.bot.launch({
            webhook: {
              domain: this.configService.get<Configuration['webHookUri']>('webHookUri', ''),
            },
            dropPendingUpdates: true,
            allowedUpdates: ['message', 'chat_member'],
          })
        : this.bot.launch({
            dropPendingUpdates: true,
          }),
    );
  }

  launchWithRetry(attempts = 20): void {
    this.tryLaunchBot()
      .pipe(
        retry({
          count: attempts,
          delay: (error, retryCount) => {
            console.log(`Error launching bot: ${error.message}. Attempt #${retryCount + 1}`);
            return timer((retryCount + 1) * 2000);
          },
        }),
      )
      .subscribe();
  }
}
