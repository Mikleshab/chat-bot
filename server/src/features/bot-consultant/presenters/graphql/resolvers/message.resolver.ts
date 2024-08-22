import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { MessageObject } from '@features/bot-consultant/presenters/graphql/dto/message.object';
import { GetRepliesInput } from '@features/bot-consultant/presenters/graphql/dto/get-replies.input';
import { ConsultantService } from '@features/bot-consultant/application/consultant.service';
import { MessageConnection } from '@features/bot-consultant/presenters/graphql/dto/message-connection.object';
import { CommandBus } from '@nestjs/cqrs';
import { ConsultantMessageCreatedCommand } from '@features/bot-consultant/application/commands/consultant-message-created.command';
import { CreateReplyInput } from '@features/bot-consultant/presenters/graphql/dto/create-reply.input';

@Resolver(() => MessageObject)
export class MessageResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly service: ConsultantService,
  ) {}

  @Query(() => MessageConnection, {
    name: 'getReplies',
    description: 'Fetches paginated replies to this message in Relay-style connection format.',
  })
  async getReplies(
    @Args('input', { description: 'Input data for fetching replies by message ID.' }) input: GetRepliesInput,
  ): Promise<MessageConnection> {
    const { replies, hasNextPage, startCursor, endCursor } = await this.service.getRepliesWithPagination(
      input.messageId,
      {
        first: input.first,
        after: input.after,
      },
    );

    return new MessageConnection(replies, hasNextPage, !!input.after, startCursor, endCursor);
  }

  @Mutation(() => Boolean, {
    name: 'createReply',
    description: 'Creates a reply to a message. Returns true if the reply is successfully created.',
  })
  createReply(@Args('input', { description: 'Input data for creating a reply.' }) input: CreateReplyInput): boolean {
    this.commandBus.execute(new ConsultantMessageCreatedCommand(input.content, input.parentId, input.clientId));

    return true;
  }
}
