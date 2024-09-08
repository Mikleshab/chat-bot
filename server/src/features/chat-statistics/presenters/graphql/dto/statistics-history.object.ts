import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('StatisticsHistoryObject', { description: 'Statistics history from telegram group.' })
export class StatisticsHistoryObject {
  @Field(() => String, { description: 'Title of dimension.' })
  title: string;

  @Field(() => String, { description: 'Value color.' })
  color: string;

  @Field(() => String, { description: 'Text for value.' })
  text: string;

  @Field(() => Number, { description: 'Value.' })
  value: number;

  constructor(title: string, color: string, text: string, value: number) {
    this.title = title;
    this.color = color;
    this.text = text;
    this.value = value;
  }
}
