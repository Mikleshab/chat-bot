import { UserDomain } from '@features/bot-consultant/domain/user.domain';

export class MessageDomain {
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
