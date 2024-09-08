import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { ChatEventType, FrequencyType } from '@features/events/domain/value-objects/chat-event-options';
import { IsDate, IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';

registerEnumType(ChatEventType, {
  name: 'ChatEventType',
  description: 'The type of the chat event, such as GREETINGS or RECURRENT',
});

registerEnumType(FrequencyType, {
  name: 'FrequencyType',
  description: 'The frequency type for event recurrence',
});

@InputType('ChatEventOptionsInput', { description: 'Input options for a chat event' })
export class ChatEventOptionsInput {
  @Field(() => FrequencyType, { description: 'Frequency type for the event recurrence (e.g., hourly, daily)' })
  @IsEnum(FrequencyType, { message: 'frequencyType must be a valid FrequencyType' })
  frequencyType!: FrequencyType;

  @Field(() => Number, { description: 'Interval between recurrences (e.g., every 2 hours)' })
  @IsInt({ message: 'interval must be an integer' })
  @Min(1, { message: 'interval must be at least 1' })
  @Max(24, { message: 'interval cannot exceed 24 for hourly recurrence' })
  interval!: number;

  @Field(() => Date, { description: 'Start date and time for the event recurrence' })
  @IsDate({ message: 'startDate must be a valid date' })
  startDate!: Date;

  @Field(() => Date, { nullable: true, description: 'End date and time for the event recurrence' })
  @IsOptional()
  @IsDate({ message: 'endDate must be a valid date' })
  endDate?: Date;
}

@ObjectType('ChatEventOptionsObject', { description: 'Object representing chat event options' })
export class ChatEventOptionsObject {
  @Field(() => ChatEventType, { description: 'Type of the chat event' })
  type!: ChatEventType;

  @Field(() => Boolean, { description: 'Indicates whether the event was system-generated' })
  system!: boolean;

  @Field(() => FrequencyType, {
    nullable: true,
    description: 'Frequency type for the event recurrence (e.g., hourly, daily)',
  })
  frequencyType?: FrequencyType;

  @Field(() => Number, { nullable: true, description: 'Interval between recurrences (e.g., every 2 hours)' })
  interval?: number;

  @Field(() => Date, { nullable: true, description: 'Start date and time for the event recurrence' })
  startDate?: Date;

  @Field(() => Date, { nullable: true, description: 'End date and time for the event recurrence' })
  endDate?: Date;

  constructor(
    type: ChatEventType,
    system: boolean,
    frequencyType?: FrequencyType,
    interval?: number,
    startDate?: Date,
    endDate?: Date,
  ) {
    this.type = type;
    this.system = system;
    this.frequencyType = frequencyType;
    this.interval = interval;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
