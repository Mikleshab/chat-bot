import { UserDomain } from '@features/consultant/domain/models/user.domain';

export class ConversationMessage {
  private replyCount: number | null = null;

  constructor(
    public readonly telegramMessageId: number,
    public readonly author: UserDomain,
    public readonly timestamp: number,
    public readonly content: string,
    public readonly replyToMessageId: number | null,
  ) {}

  getReplyCount() {
    return this.replyCount || 0;
  }
}
