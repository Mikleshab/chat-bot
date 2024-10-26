import { CreateAnnouncementCommand } from '@features/announcements/application/commands/create-announcement.command';
import { DeleteAnnouncementCommand } from '@features/announcements/application/commands/delete-announcement.command';
import { UpdateAnnouncementCommand } from '@features/announcements/application/commands/update-announcement.command';
import { GetAllAnnouncementsQuery } from '@features/announcements/application/queries/get-all-announcements.query';
import { GetAnnouncementQuery } from '@features/announcements/application/queries/get-announcement.query';
import { Announcement } from '@features/announcements/domain/model/announcement';
import { AnnouncementEventObject } from '@features/announcements/presenters/graphql/dto/announcement-event.object';
import { AnnouncementObject } from '@features/announcements/presenters/graphql/dto/announcement.object';
import { CreateAnnouncementInput } from '@features/announcements/presenters/graphql/dto/create.input';
import { DeleteAnnouncementInput } from '@features/announcements/presenters/graphql/dto/delete.input';
import { GetAllAnnouncementInput } from '@features/announcements/presenters/graphql/dto/get-all.input';
import { GetAnnouncementInput } from '@features/announcements/presenters/graphql/dto/get.input';
import { UpdateAnnouncementInput } from '@features/announcements/presenters/graphql/dto/update.input';
import { AnnouncementEventMapper } from '@features/announcements/presenters/graphql/mappers/announcement-event.mapper';
import { AnnouncementMapper } from '@features/announcements/presenters/graphql/mappers/announcement.mapper';
import { GetAllChatEventsQuery } from '@features/events/application/queries/get-all-chat-events.query';
import { GetChatEventByAnnouncementIdQuery } from '@features/events/application/queries/get-chat-event-by-announcement-id.query';
import { ChatEvent } from '@features/events/domain/model/chat-event';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/core/auth/auth.guard';

@Resolver(() => AnnouncementObject)
@UseGuards(AuthGuard)
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
      new GetAnnouncementQuery(input.id, input.chatId),
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
    const announcements = await this.queryBus.execute<GetAllAnnouncementsQuery, Announcement[]>(
      new GetAllAnnouncementsQuery(input.chatId),
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
    await this.commandBus.execute(new UpdateAnnouncementCommand(input.id, input.chatId, input.title, input.text));

    return true;
  }

  @Mutation(() => Boolean, {
    name: 'deleteAnnouncement',
    description: 'Deletes an existing announcement by id',
  })
  async delete(
    @Args('input', { description: 'Input data for deleting an existing announcement' }) input: DeleteAnnouncementInput,
  ) {
    await this.commandBus.execute(new DeleteAnnouncementCommand(input.id, input.chatId));

    return true;
  }

  @ResolveField(() => AnnouncementEventObject, { name: 'event', description: '' })
  async eventFor(@Parent() announcement: AnnouncementObject) {
    const event = await this.queryBus.execute<GetChatEventByAnnouncementIdQuery, ChatEvent>(
      new GetChatEventByAnnouncementIdQuery(announcement.id, announcement.chatId),
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
