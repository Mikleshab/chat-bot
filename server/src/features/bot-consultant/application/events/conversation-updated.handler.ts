import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ConversationUpdatedEvent } from '@features/bot-consultant/domain/events/conversation-updated.event';
import { PubSubEngine } from 'graphql-subscriptions';

@EventsHandler(ConversationUpdatedEvent)
export class ConversationUpdatedHandler implements IEventHandler<ConversationUpdatedEvent> {
  constructor(private readonly pubSub: PubSubEngine) {}

  handle(event: ConversationUpdatedEvent) {
    this.pubSub.publish(ConversationUpdatedEvent.name, event);
  }
}
