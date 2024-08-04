export type BotEventType = 'new_chat_members' | 'left_chat_member' | 'text';

export interface TelegramBotHandler {
  handleEvent: (event: BotEventType, callback: (ctx: unknown) => void) => void;
}
