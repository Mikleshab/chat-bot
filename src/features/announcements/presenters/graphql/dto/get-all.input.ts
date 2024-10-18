import { Field, InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType({ description: 'Input type for retrieving all announcements by the Chat ID' })
export class GetAllAnnouncementInput {
  @Field(() => Number, { description: 'The unique identifier of the Chat' })
  @IsInt({ message: 'The chat ID must be an integer value' })
  chatId!: number;
}
