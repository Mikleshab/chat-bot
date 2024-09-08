import { Field, InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';
import { Announcement } from '@features/announcements/domain/model/announcement';

@InputType({ description: 'Input type for retrieving all announcements by the Chat ID' })
export class GetAllAnnouncementInput {
  @Field(() => Number, { description: 'The unique identifier of the Chat' })
  @IsInt({ message: 'The Chat ID must be a string' })
  chatId!: Announcement['chatId'];
}
