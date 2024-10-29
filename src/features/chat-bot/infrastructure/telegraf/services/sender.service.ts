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
      from(
        this.service
          .getBot()
          .telegram.sendMessage(chatId, this.sanitizeHtmlForTelegram(text), { ...(extra || {}), parse_mode: 'HTML' }),
      ).pipe(
        retry({
          count: 2,
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

  sanitizeHtmlForTelegram(html: string): string {
    return html
      .replace(/<h[1-6]>/g, '<b>')
      .replace(/<\/h[1-6]>/g, '</b>')
      .replace(/<br>/g, '\n')
      .replace(/<div>/g, '\n')
      .replace(/<\/div>/g, '\n')
      .replace(/<p>/g, '')
      .replace(/<\/p>/g, '\n')
      .replace(/<ol>/g, '')
      .replace(/<\/ol>/g, '')
      .replace(/<ul>/g, '')
      .replace(/<\/ul>/g, '')
      .replace(/<li>/g, '* ')
      .replace(/<\/li>/g, '\n');
  }
}
