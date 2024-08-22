import { UserDomain } from '@features/bot-consultant/domain/user.domain';

export class MessageDomain {
  private replyCount: number | null = null;

  constructor(
    public readonly messageId: string,
    public readonly telegramMessageId: number | null,
    public readonly author: UserDomain,
    public readonly timestamp: number,
    public readonly content: string,
    public readonly parentId: string | null,
  ) {}

  getReplyCount() {
    return this.replyCount || 0;
  }
}
