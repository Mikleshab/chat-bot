export abstract class ChatBotRepository {
  abstract welcome(): Promise<string[]>;
}
