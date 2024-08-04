export interface TelegramBotCallback {
  handleCallback: (callback: (data: unknown, ctx: unknown) => void) => void;
}
