import { Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'graphql-subscriptions';
import { MessageConnection } from '@features/bot-consultant/presenters/graphql/dto/message-connection.object';
import { MessageUpdatedEvent } from '@features/bot-consultant/domain/events/message-updated.event';
import { MessageDomain } from '@features/bot-consultant/domain/message.domain';
import { MessageMapper } from '@features/bot-consultant/presenters/graphql/mappers/message.mapper';
import { MessageObject } from '@features/bot-consultant/presenters/graphql/dto/message.object';

@Resolver(() => MessageConnection)
export class MessageSubscriptionResolver {
  constructor(private readonly pubSub: PubSubEngine) {}

  @Subscription(() => MessageObject, {
    name: MessageUpdatedEvent.name,
    resolve: (payload: MessageDomain) => MessageMapper.toObjectType(payload),
  })
  messageUpdated() {
    return this.pubSub.asyncIterator(MessageUpdatedEvent.name);
  }
}
