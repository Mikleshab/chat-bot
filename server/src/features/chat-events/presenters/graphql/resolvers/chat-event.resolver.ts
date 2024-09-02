import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ChatEventObject } from '../dto/chat-event.object';
import { AddChatEventCommand } from '../../../application/commands/add-chat-event.command';
import { GetChatEventByTypeQuery } from '../../../application/queries/get-chat-event-by-type.query';
import { RemoveChatEventCommand } from '../../../application/commands/remove-chat-event.command';
import { GetAllChatEventsQuery } from '../../../application/queries/get-all-chat-events.query';
import { AddChatEventInput } from '../dto/add.input';
import { GetChatEventInput } from '../dto/get.input';
import { GetAllChatEventInput } from '../dto/get-all.input';
import { RemoveChatEventInput } from '../dto/remove.input';
import { ChatEventMapper } from '../mappers/chat-event.mapper';

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
  async addChatEvent(
    @Args('input', { description: 'Input data to create a new chat event' }) input: AddChatEventInput,
  ) {
    await this.commandBus.execute(new AddChatEventCommand(input.chatId, input.eventType, input.announcementId));

    return true;
  }

  @Query(() => ChatEventObject, {
    name: 'getGetChatEvent',
    description: 'Retrieves a specific chat event based on chatId and eventType',
  })
  async getGetChatEvent(
    @Args('input', { description: 'Input data to retrieve a specific chat event' }) input: GetChatEventInput,
  ) {
    const chatEvent = await this.queryBus.execute(new GetChatEventByTypeQuery(input.chatId, input.eventType));

    return ChatEventMapper.toObjectType(chatEvent);
  }

  @Query(() => [ChatEventObject], {
    name: 'getGetAllChatEvents',
    description: 'Retrieves all events for a specific chat based on chatId',
  })
  async getGetAllChatEvents(
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
  async removeChatEvent(
    @Args('input', { description: 'Input data to remove a specific chat event' }) input: RemoveChatEventInput,
  ) {
    await this.commandBus.execute(new RemoveChatEventCommand(input.id));

    return true;
  }
}
