export interface TelegramBotHears {
  hears: <T extends string>(command: T, callback: (ctx: unknown) => void) => void;
}
