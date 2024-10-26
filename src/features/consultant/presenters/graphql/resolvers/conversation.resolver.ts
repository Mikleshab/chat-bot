import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ConversationObject } from '@features/consultant/presenters/graphql/dto/conversation.object';
import { ConversationMapper } from '@features/consultant/presenters/graphql/mappers/conversation.mapper';
import { MessageObject } from '@features/consultant/presenters/graphql/dto/message.object';
import { ConversationMessageMapper } from '@features/consultant/presenters/graphql/mappers/conversation-message.mapper';
import { GetConversationInput } from '@features/consultant/presenters/graphql/dto/get-conversation.input';
import { QueryBus } from '@nestjs/cqrs';
import { GetAllConversations } from '@features/consultant/application/queries/get-all-conversations.query';
import { Conversation } from '@features/consultant/domain/value-objects/conversation';
import { GetAllClientQuestionsQuery } from '@features/consultant/application/queries/get-all-client-questions.query';
import { ConversationMessage } from '@features/consultant/domain/models/conversation-message';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/core/auth/auth.guard';

@Resolver(() => ConversationObject)
@UseGuards(AuthGuard)
export class ConversationResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => [ConversationObject], {
    name: 'getConversations',
    description: 'Fetches a list of all conversations. Returns an array of conversation objects.',
  })
  async getConversations() {
    const conversations = await this.queryBus.execute<GetAllConversations, Conversation[]>(new GetAllConversations());

    return conversations.map((conversation) => ConversationMapper.toObjectType(conversation));
  }

  @Query(() => ConversationObject, {
    name: 'getConversation',
    description: 'Fetches a specific conversation based on the client ID provided in the input.',
  })
  async getConversation(
    @Args('input', { description: 'Input containing the client ID to fetch a specific conversation.' })
    input: GetConversationInput,
  ) {
    const [conversation] = await this.queryBus.execute<GetAllConversations, Conversation[]>(
      new GetAllConversations({ clientIds: [input.clientId] }),
    );

    return ConversationMapper.toObjectType(conversation);
  }

  @ResolveField(() => [MessageObject], {
    name: 'questions',
    description:
      'Fetches all questions associated with the conversation based on the client ID. Returns an array of message objects.',
  })
  async getQuestions(@Parent() conversation: ConversationObject): Promise<MessageObject[]> {
    const messages = await this.queryBus.execute<GetAllClientQuestionsQuery, ConversationMessage[]>(
      new GetAllClientQuestionsQuery(conversation.client.userId),
    );

    return messages.map((message) => ConversationMessageMapper.toObjectType(message));
  }
}
