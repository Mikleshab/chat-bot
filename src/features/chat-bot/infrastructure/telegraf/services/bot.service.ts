import { Configuration } from '@features/chat-bot/infrastructure/telegraf/config/config.schema';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { defer, timer } from 'rxjs';
import { retry } from 'rxjs/operators';
import { Telegraf } from 'telegraf';

@Injectable()
export class BotService {
  private bot!: Telegraf;
  private readonly token: string;

  constructor(configService: ConfigService<Configuration>) {
    this.token = configService.get<string>('botToken', '');
    this.initializeBot();
  }

  getBot() {
    return this.bot;
  }

  private initializeBot() {
    this.bot = new Telegraf(this.token, { handlerTimeout: 30000 });
  }

  private tryLaunchBot() {
    const production = false;

    return defer(() =>
      this.bot.launch({
        webhook: production
          ? {
              domain: '',
            }
          : undefined,
        dropPendingUpdates: true,
        allowedUpdates: ['message', 'chat_member'],
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
