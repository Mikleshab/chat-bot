import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsPositive } from 'class-validator';
import { ConversationObject } from '@features/bot-consultant/presenters/graphql/dto/conversation.object';

@InputType('GetConversationInput', { description: 'Input arguments for the GetConversation query.' })
export class GetConversationInput {
  @Field(() => Number, { description: 'The unique identifier of the client.' })
  @IsPositive({ message: 'Client ID must be a number.' })
  @IsNotEmpty({ message: 'Client ID must not be empty.' })
  clientId!: ConversationObject['client']['userId'];
}
