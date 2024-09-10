import { Injectable } from '@nestjs/common';
import { catchError, from, lastValueFrom, retry, throwError, timer } from 'rxjs';
import { Telegram } from 'telegraf/src/core/types/typegram';
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';
import { BotService } from './bot.service';

@Injectable()
export class SenderService {
  constructor(private readonly service: BotService) {}

  sendMessageWithRetry(
    chatId: number,
    text: string,
    extra?: ExtraReplyMessage,
  ): Promise<ReturnType<Telegram['sendMessage']>> {
    return lastValueFrom(
      from(this.service.getBot().telegram.sendMessage(chatId, text, extra)).pipe(
        retry({
          count: 10,
          delay: (error, retryCount) => {
            console.log(`Error sending message: ${error.message}. Attempt #${retryCount}`);
            return timer(retryCount * 2000);
          },
        }),
        catchError((error) => {
          console.error('Failed to send message after several attempts', error);
          return throwError(() => new Error('Failed to send message after several attempts'));
        }),
      ),
    );
  }
}
