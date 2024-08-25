import { Args, Resolver, Subscription } from '@nestjs/graphql';
import { PubSubEngine } from 'graphql-subscriptions';
import { ConversationObject } from '@features/bot-consultant/presenters/graphql/dto/conversation.object';
import { GetConversationInput } from '@features/bot-consultant/presenters/graphql/dto/get-conversation.input';
import { ConversationUpdatedEvent } from '@features/bot-consultant/domain/events/conversation-updated.event';
import { ConversationMapper } from '@features/bot-consultant/presenters/graphql/mappers/conversation.mapper';

@Resolver(() => ConversationObject)
export class ConversationSubscriptionResolver {
  constructor(private readonly pubSub: PubSubEngine) {}

  @Subscription(() => ConversationObject, {
    name: ConversationUpdatedEvent.name,
    resolve: (payload: ConversationUpdatedEvent) => ConversationMapper.toObjectType(payload.conversationUpdated),
    filter: (payload: ConversationUpdatedEvent, variables: { input: GetConversationInput }) => {
      return payload.conversationUpdated.client.userId === variables.input.clientId;
    },
  })
  conversationUpdated(@Args('input') _input: GetConversationInput) {
    return this.pubSub.asyncIterator(ConversationUpdatedEvent.name);
  }
}
