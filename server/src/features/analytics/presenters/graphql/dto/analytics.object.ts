import { AnalyticsHistoryObject } from '@features/analytics/presenters/graphql/dto/analytics-history.object';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('AnalyticsObject', { description: 'Analytics.' })
export class AnalyticsObject {
  @Field(() => String, { description: 'Title.' })
  title: string;

  @Field(() => String, { description: 'Main counter.' })
  count: string;

  @Field(() => String, { description: 'Difference.' })
  diff: string;

  @Field(() => String, { description: 'Difference icon.' })
  icon: string;

  @Field(() => [AnalyticsHistoryObject], { description: 'Analytics history.' })
  history: AnalyticsHistoryObject[];

  constructor(title: string, count: string, diff: string, icon: string, history: AnalyticsHistoryObject[]) {
    this.title = title;
    this.count = count;
    this.diff = diff;
    this.icon = icon;
    this.history = history;
  }
}
