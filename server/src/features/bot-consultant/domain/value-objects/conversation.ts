import { ConversationState } from '@features/bot-consultant/domain/value-objects/conversation-state';
import { DateTime } from 'luxon';
import { UserDomain } from '@features/bot-consultant/domain/user.domain';

export class Conversation {
  private messagesCount = 0;
  private updatedAt = Date.now();

  constructor(
    public readonly title: string,
    public readonly client: UserDomain,
    public readonly createdAt: number,
  ) {}

  getLastActivity() {
    return this.updatedAt;
  }

  updateLastActivity(timestamp: number): Conversation {
    this.updatedAt = timestamp;

    return this;
  }

  getMessagesCount() {
    return this.messagesCount;
  }

  updateMessagesCount() {
    this.messagesCount++;

    return this;
  }

  calculateState(): ConversationState {
    const createdAt = DateTime.fromMillis(this.createdAt || Date.now());
    const lastActivity = DateTime.fromMillis(this.updatedAt);
    const now = DateTime.now();

    const createdAtDiffsInDays = now.diff(createdAt, 'days').days;
    const activityDiffsInDays = now.diff(lastActivity, 'days').days;

    if (createdAtDiffsInDays <= 7) {
      return ConversationState.NEW;
    } else if (activityDiffsInDays <= 30) {
      return ConversationState.SLEEP;
    } else {
      return ConversationState.RECURRING;
    }
  }
}
