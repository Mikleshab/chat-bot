import { Message } from '@features/chat-bot/domain/models/message';

export class TextMapper {
  static toText(message: Message): string {
    return message.text;
  }
}
