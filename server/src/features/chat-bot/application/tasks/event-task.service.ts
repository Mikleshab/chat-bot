import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { QueryBus } from '@nestjs/cqrs';
import { Bot } from '@features/chat-bot/domain/models/bot';
import { GetAllChatEventsQuery } from '@features/events/application/queries/get-all-chat-events.query';
import { ChatEvent } from '@features/events/domain/model/chat-event';
import { GetAnnouncementQuery } from '@features/announcements/application/queries/get-announcement.query';
import { Announcement } from '@features/announcements/domain/model/announcement';
import { DateTime } from 'luxon';
import { FrequencyType } from '@features/events/domain/value-objects/chat-event-options';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly queryBus: QueryBus,
    private readonly bot: Bot,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async handleCron() {
    this.logger.debug('Cron job started: Checking chat events.');

    try {
      const input = { chatId: 1 };

      const chatEvents = await this.queryBus.execute<GetAllChatEventsQuery, ChatEvent[]>(
        new GetAllChatEventsQuery(input.chatId),
      );

      const now = new Date();

      for (const event of chatEvents) {
        if (this.shouldSendEvent(event, now)) {
          const announcement = await this.queryBus.execute<GetAnnouncementQuery, Announcement>(
            new GetAnnouncementQuery(event.announcementId),
          );

          await this.bot.send(event.chatId, announcement.text);
        }
      }
    } catch (error: unknown) {
      this.logger.error('Error while executing chat events cron job', error);
    }
  }

  private shouldSendEvent(event: ChatEvent, now: Date): boolean {
    const { startDate, endDate, frequencyType, interval } = event.eventOptions;

    if (!startDate) {
      return false;
    }

    const start = DateTime.fromJSDate(startDate);
    const current = DateTime.fromJSDate(now);

    if (endDate && current > DateTime.fromJSDate(endDate)) {
      return false;
    }

    const diff = current.diff(start, ['hours', 'days', 'weeks', 'months', 'years']);

    switch (frequencyType) {
      case FrequencyType.HOURLY:
        return Math.floor(diff.hours) % (interval || 1) === 0;

      case FrequencyType.DAILY:
        return Math.floor(diff.days) % (interval || 1) === 0;

      case FrequencyType.WEEKLY:
        return Math.floor(diff.weeks) % (interval || 1) === 0;

      case FrequencyType.MONTHLY:
        return Math.floor(diff.months) % (interval || 1) === 0;

      case FrequencyType.YEARLY:
        return Math.floor(diff.years) % (interval || 1) === 0;

      default:
        return false;
    }
  }
}
