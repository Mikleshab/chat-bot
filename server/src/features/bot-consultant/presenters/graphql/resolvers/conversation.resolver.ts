import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ConversationObject } from '@features/bot-consultant/presenters/graphql/dto/conversation.object';
import { ConsultantService } from '@features/bot-consultant/application/consultant.service';
import { ConversationMapper } from '@features/bot-consultant/presenters/graphql/mappers/conversation.mapper';
import { MessageObject } from '@features/bot-consultant/presenters/graphql/dto/message.object';
import { MessageMapper } from '@features/bot-consultant/presenters/graphql/mappers/message.mapper';
import { GetConversationInput } from '@features/bot-consultant/presenters/graphql/dto/get-conversation.input';

@Resolver(() => ConversationObject)
export class ConversationResolver {
  constructor(private readonly service: ConsultantService) {}

  @Query(() => [ConversationObject], {
    name: 'getConversations',
    description: 'Fetches a list of all conversations. Returns an array of conversation objects.',
  })
  async getConversations() {
    const conversations = await this.service.getConversations();

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
    const [conversation] = await this.service.getConversations({ clientIds: [input.clientId] });

    return ConversationMapper.toObjectType(conversation);
  }

  @ResolveField(() => [MessageObject], {
    name: 'messages',
    description:
      'Fetches all messages associated with the conversation based on the client ID. Returns an array of message objects.',
  })
  async getMessages(@Parent() conversation: ConversationObject): Promise<MessageObject[]> {
    const messages = await this.service.getQuestions(conversation.client.userId);

    return messages.map((message) => MessageMapper.toObjectType(message));
  }
}
