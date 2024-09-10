import { GetMembersAnalyticsHandler } from '@features/analytics/application/queries/get-members-analytics.handler';
import { GetMessagesAnalyticsHandler } from '@features/analytics/application/queries/get-messages-analytics.handler';
import { FirebaseModule } from '@features/analytics/infrastructure/firebase/firebase.module';
import { AnalyticsResolver } from '@features/analytics/presenters/graphql/resolvers/analytics.resolver';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

const handlers = [GetMessagesAnalyticsHandler, GetMembersAnalyticsHandler];

@Module({
  providers: [AnalyticsResolver, ...handlers],
  imports: [CqrsModule, FirebaseModule],
})
export class AnalyticsModule {}
