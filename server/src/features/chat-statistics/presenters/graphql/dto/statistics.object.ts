import { Field, ObjectType } from '@nestjs/graphql';
import { StatisticsHistoryObject } from '@features/chat-statistics/presenters/graphql/dto/statistics-history.object';

@ObjectType('StatisticsObject', { description: 'Statistics from chat.' })
export class StatisticsObject {
  @Field(() => String, { description: 'Title.' })
  title: string;

  @Field(() => String, { description: 'Main counter.' })
  count: string;

  @Field(() => String, { description: 'Difference.' })
  diff: string;

  @Field(() => String, { description: 'Difference icon.' })
  icon: string;

  @Field(() => [StatisticsHistoryObject], { description: 'Statistics history from chat.' })
  history: StatisticsHistoryObject[];

  constructor(title: string, count: string, diff: string, icon: string, history: StatisticsHistoryObject[]) {
    this.title = title;
    this.count = count;
    this.diff = diff;
    this.icon = icon;
    this.history = history;
  }
}
