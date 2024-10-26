import { GetMembersAnalyticsQuery } from '@features/analytics/application/queries/get-members-analytics.query';
import { GetMessagesAnalyticsQuery } from '@features/analytics/application/queries/get-messages-analytics.query';
import { Analytics } from '@features/analytics/domain/models/analytics';
import { AnalyticsObject } from '@features/analytics/presenters/graphql/dto/analytics.object';
import { GetAnalyticsInput } from '@features/analytics/presenters/graphql/dto/get-analytics.input';
import { AnalyticsMapper } from '@features/analytics/presenters/graphql/mappers/analytics.mapper';
import { QueryBus } from '@nestjs/cqrs';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/core/auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => AnalyticsObject)
@UseGuards(AuthGuard)
export class AnalyticsResolver {
  constructor(private readonly queryBus: QueryBus) {}

  @Query(() => AnalyticsObject, { name: 'getMessagesAnalytics' })
  async getMessagesAnalytics(
    @Args('input', { description: 'Input data containing the Chat ID' }) input: GetAnalyticsInput,
  ) {
    const analytics = await this.queryBus.execute<GetMessagesAnalyticsQuery, Analytics>(
      new GetMessagesAnalyticsQuery(input.chatId),
    );

    return AnalyticsMapper.toObjectType(analytics);
  }

  @Query(() => AnalyticsObject, { name: 'getMembersAnalytics' })
  async getMembersAnalytics(
    @Args('input', { description: 'Input data containing the Chat ID' }) input: GetAnalyticsInput,
  ) {
    const analytics = await this.queryBus.execute<GetMembersAnalyticsQuery, Analytics>(
      new GetMembersAnalyticsQuery(input.chatId),
    );

    return AnalyticsMapper.toObjectType(analytics);
  }
}
