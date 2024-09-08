import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessageObject } from '@features/consultant/presenters/graphql/dto/message.object';
import { GetRepliesInput } from '@features/consultant/presenters/graphql/dto/get-replies.input';
import { MessageConnection } from '@features/consultant/presenters/graphql/dto/message-connection.object';
import { SaveConsultantReplyCommand } from '@features/consultant/application/commands/save-consultant-reply.command';
import { CreateConsultantReplyInput } from '@features/consultant/presenters/graphql/dto/create-consultant-reply.input';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllRepliesQuery } from '@features/consultant/application/queries/get-all-replies.query';
import { ConversationMessage } from '@features/consultant/domain/models/conversation-message';
import { ConversationMessageConnectionMapper } from '@features/consultant/presenters/graphql/mappers/conversation-message-connection.mapper';

@Resolver(() => MessageObject)
export class MessageResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Query(() => MessageConnection, {
    name: 'getReplies',
    description: 'Fetches paginated replies to this message in Relay-style connection format.',
  })
  async getReplies(
    @Args('input', { description: 'Input data for fetching replies by message ID.' }) input: GetRepliesInput,
  ): Promise<MessageConnection> {
    const pageInfo = {
      first: input.first,
      after: input.after,
    };

    const replies = await this.queryBus.execute<GetAllRepliesQuery, ConversationMessage[]>(
      new GetAllRepliesQuery(input.messageId, pageInfo),
    );

    return ConversationMessageConnectionMapper.toObjectType(replies, pageInfo);
  }

  @Mutation(() => Boolean, {
    name: 'createConsultantReply',
    description: 'Creates a consultant reply to a message. Returns true if the reply is successfully created.',
  })
  async createConsultantReply(
    @Args('input', { description: 'Input data for creating a reply.' }) input: CreateConsultantReplyInput,
  ): Promise<boolean> {
    await this.commandBus.execute(new SaveConsultantReplyCommand(input.content, input.parentId, input.clientId));

    return true;
  }
}
