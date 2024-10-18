import { AddChatEventCommand } from '@features/events/application/commands/add-chat-event.command';
import { RemoveChatEventCommand } from '@features/events/application/commands/remove-chat-event.command';
import { GetAllChatEventsQuery } from '@features/events/application/queries/get-all-chat-events.query';
import { GetChatEventByTypeQuery } from '@features/events/application/queries/get-chat-event-by-type.query';
import { AddChatEventInput } from '@features/events/presenters/graphql/dto/add.input';
import { ChatEventObject } from '@features/events/presenters/graphql/dto/chat-event.object';
import { GetAllChatEventInput } from '@features/events/presenters/graphql/dto/get-all.input';
import { GetChatEventInput } from '@features/events/presenters/graphql/dto/get.input';
import { RemoveChatEventInput } from '@features/events/presenters/graphql/dto/remove.input';
import { ChatEventMapper } from '@features/events/presenters/graphql/mappers/chat-event.mapper';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

@Resolver(() => ChatEventObject)
export class ChatEventResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => Boolean, {
    name: 'addChatEvent',
    description: 'Adds a new event to a specific chat',
  })
  async add(@Args('input', { description: 'Input data to create a new chat event' }) input: AddChatEventInput) {
    await this.commandBus.execute(
      new AddChatEventCommand(input.chatId, input.title, input.eventOptions, input.announcementId),
    );

    return true;
  }

  @Query(() => ChatEventObject, {
    name: 'getChatEvent',
    description: 'Retrieves a specific chat event based on chatId and eventType',
  })
  async get(@Args('input', { description: 'Input data to retrieve a specific chat event' }) input: GetChatEventInput) {
    const chatEvent = await this.queryBus.execute(new GetChatEventByTypeQuery(input.chatId, input.eventType));

    return ChatEventMapper.toObjectType(chatEvent);
  }

  @Query(() => [ChatEventObject], {
    name: 'getAllChatEvents',
    description: 'Retrieves all events for a specific chat based on chatId',
  })
  async getAll(
    @Args('input', { description: 'Input data to retrieve all events for a specific chat' })
    input: GetAllChatEventInput,
  ) {
    const chatEvents = await this.queryBus.execute(new GetAllChatEventsQuery(input.chatId));

    return chatEvents.map(ChatEventMapper.toObjectType);
  }

  @Mutation(() => Boolean, {
    name: 'removeChatEvent',
    description: 'Removes a specific event from a chat based on chatId and eventType',
  })
  async remove(
    @Args('input', { description: 'Input data to remove a specific chat event' }) input: RemoveChatEventInput,
  ) {
    await this.commandBus.execute(new RemoveChatEventCommand(input.id, input.chatId));

    return true;
  }
}
