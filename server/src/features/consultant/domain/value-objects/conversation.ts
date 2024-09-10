import { UserDomain } from '@features/consultant/domain/models/user.domain';
import { ConversationState } from '@features/consultant/domain/value-objects/conversation-state';
import { DateTime } from 'luxon';

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

  setLastActivity(timestamp: number): Conversation {
    this.updatedAt = timestamp;

    return this;
  }

  getMessagesCount() {
    return this.messagesCount;
  }

  setMessagesCount(messagesCount: number) {
    this.messagesCount = messagesCount;

    return this;
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
