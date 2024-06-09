export abstract class ChatBotRepository {
  abstract getWelcomeText(): Promise<string[]>;

  abstract getFormLink(): Promise<{
    title: string;
    url: string
  }>;
}
