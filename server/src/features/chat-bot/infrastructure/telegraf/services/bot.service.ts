import { Telegraf } from 'telegraf';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { Configuration } from '@features/chat-bot/infrastructure/telegraf/config/config.schema';
import { defer, timer } from 'rxjs';
import { retry } from 'rxjs/operators';

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
    return defer(() =>
      this.bot.launch({
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
