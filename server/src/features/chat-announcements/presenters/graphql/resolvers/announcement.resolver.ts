import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetChatEventByAnnouncementIdQuery } from '@features/chat-events/application/queries/get-chat-event-by-announcement-id.query';
import { GetAllChatEventsQuery } from '@features/chat-events/application/queries/get-all-chat-events.query';
import { ChatEvent } from '@features/chat-events/domain/model/chat-event';
import { AnnouncementObject } from '../dto/announcement.object';
import { CreateAnnouncementInput } from '../dto/create.input';
import { GetAnnouncementInput } from '../dto/get.input';
import { UpdateAnnouncementInput } from '../dto/update.input';
import { CreateAnnouncementCommand } from '../../../application/commands/create-announcement.command';
import { UpdateAnnouncementCommand } from '../../../application/commands/update-announcement.command';
import { GetAllAnnouncementQuery } from '../../../application/queries/get-all-announcement.query';
import { GetAnnouncementQuery } from '../../../application/queries/get-announcement.query';
import { AnnouncementMapper } from '../mappers/announcement.mapper';
import { DeleteAnnouncementCommand } from '../../../application/commands/delete-announcement.command';
import { DeleteAnnouncementInput } from '../dto/delete.input';
import { GetAllAnnouncementInput } from '../dto/get-all.input';
import { AnnouncementEventObject } from '../dto/announcement-event.object';
import { AnnouncementEventMapper } from '../mappers/announcement-event.mapper';
import { Announcement } from '@features/chat-announcements/domain/model/announcement';

@Resolver(() => AnnouncementObject)
export class AnnouncementResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => Boolean, {
    name: 'createAnnouncement',
    description: 'Creates a new announcement with the provided text',
  })
  async create(
    @Args('input', { description: 'Input data for creating a new announcement' }) input: CreateAnnouncementInput,
  ) {
    await this.commandBus.execute(new CreateAnnouncementCommand(input.title, input.text, input.chatId));

    return true;
  }

  @Query(() => AnnouncementObject, { name: 'getAnnouncement', description: 'Retrieves an announcement by its ID' })
  async get(
    @Args('input', { description: 'Input data containing the ID of the announcement to retrieve' })
    input: GetAnnouncementInput,
  ) {
    const announcement = await this.queryBus.execute<GetAnnouncementQuery, Announcement>(
      new GetAnnouncementQuery(input.id),
    );

    return AnnouncementMapper.toObjectType(announcement);
  }

  @Query(() => [AnnouncementObject], {
    name: 'getAllAnnouncements',
    description: 'Retrieves all announcement for the Chat',
  })
  async getAll(
    @Args('input', { description: 'Input data containing the Chat ID' })
    input: GetAllAnnouncementInput,
  ) {
    const announcements = await this.queryBus.execute<GetAllAnnouncementQuery, Announcement[]>(
      new GetAllAnnouncementQuery(input.chatId),
    );

    return announcements.map(AnnouncementMapper.toObjectType);
  }

  @Mutation(() => Boolean, {
    name: 'updateAnnouncement',
    description: 'Updates an existing announcement with the provided text',
  })
  async update(
    @Args('input', { description: 'Input data for updating an existing announcement' }) input: UpdateAnnouncementInput,
  ) {
    await this.commandBus.execute(new UpdateAnnouncementCommand(input.id, input.title, input.text));

    return true;
  }

  @Mutation(() => Boolean, {
    name: 'deleteAnnouncement',
    description: 'Deletes an existing announcement by id',
  })
  async delete(
    @Args('input', { description: 'Input data for deleting an existing announcement' }) input: DeleteAnnouncementInput,
  ) {
    await this.commandBus.execute(new DeleteAnnouncementCommand(input.id));

    return true;
  }

  @ResolveField(() => AnnouncementEventObject, { name: 'event', description: '' })
  async eventFor(@Parent() announcement: AnnouncementObject) {
    const event = await this.queryBus.execute<GetChatEventByAnnouncementIdQuery, ChatEvent>(
      new GetChatEventByAnnouncementIdQuery(announcement.id),
    );

    return AnnouncementEventMapper.toObjectType(event);
  }

  @ResolveField(() => AnnouncementEventObject, { name: 'eventsForAnnouncement', description: '' })
  async eventsFor(@Parent() announcement: AnnouncementObject) {
    const events = await this.queryBus.execute<GetAllChatEventsQuery, ChatEvent[]>(
      new GetAllChatEventsQuery(announcement.chatId),
    );

    return events.map(AnnouncementEventMapper.toObjectType);
  }
}
