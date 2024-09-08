import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'graphql-subscriptions';
import { MessageConnection } from '@features/consultant/presenters/graphql/dto/message-connection.object';
import { MessageUpdatedEvent } from '@features/consultant/application/events/message-updated.event';
import { ConversationMessage } from '@features/consultant/domain/models/conversation-message';
import { ConversationMessageMapper } from '@features/consultant/presenters/graphql/mappers/conversation-message.mapper';
import { MessageObject } from '@features/consultant/presenters/graphql/dto/message.object';

@Resolver(() => MessageConnection)
export class MessageSubscriptionResolver {
  constructor(private readonly pubSub: PubSubEngine) {}

  @Subscription(() => MessageObject, {
    name: MessageUpdatedEvent.name,
    resolve: (payload: ConversationMessage) => ConversationMessageMapper.toObjectType(payload),
  })
  messageUpdated() {
    return this.pubSub.asyncIterator(MessageUpdatedEvent.name);
  }
}
