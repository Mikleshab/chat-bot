import { GetMessagesAnalyticsQuery } from '@features/analytics/application/queries/get-messages-analytics.query';
import { AnalyticsRepository } from '@features/analytics/application/repositories/analytics.repository';
import { AnalyticsFactory } from '@features/analytics/domain/factories/analytics.factory';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetMessagesAnalyticsQuery)
export class GetMessagesAnalyticsHandler implements IQueryHandler<GetMessagesAnalyticsQuery> {
  constructor(private readonly repository: AnalyticsRepository) {}

  async execute(query: GetMessagesAnalyticsQuery): Promise<any> {
    const { chatId } = query;

    const count = await this.repository.getMessagesCount(chatId);
    const messageHistory = await this.repository.getMessageHistory(chatId);

    return AnalyticsFactory.create(`Сообщения`, `Количество сообщений`, count, messageHistory);
  }
}
