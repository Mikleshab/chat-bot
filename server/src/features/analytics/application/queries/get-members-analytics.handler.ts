import { GetMembersAnalyticsQuery } from '@features/analytics/application/queries/get-members-analytics.query';
import { AnalyticsRepository } from '@features/analytics/application/repositories/analytics.repository';
import { AnalyticsFactory } from '@features/analytics/domain/factories/analytics.factory';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

@QueryHandler(GetMembersAnalyticsQuery)
export class GetMembersAnalyticsHandler implements IQueryHandler<GetMembersAnalyticsQuery> {
  constructor(private readonly repository: AnalyticsRepository) {}

  async execute(query: GetMembersAnalyticsQuery): Promise<any> {
    const { chatId } = query;

    const count = await this.repository.getMembersCount(chatId);
    const membersHistory = await this.repository.getMembersHistory(chatId);

    return AnalyticsFactory.create(`Пользователи`, `Количество пользователей`, count, membersHistory);
  }
}
