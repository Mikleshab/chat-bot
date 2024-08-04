import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('WelcomeMessageObject', { description: 'Welcome message for new group members.' })
export class WelcomeMessageObject {
  @Field(() => String, { description: 'Text.' })
  text: string;

  constructor(text: string) {
    this.text = text;
  }
}
