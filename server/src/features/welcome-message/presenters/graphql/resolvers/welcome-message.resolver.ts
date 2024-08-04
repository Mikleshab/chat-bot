import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WelcomeMessageObject } from '@features/welcome-message/presenters/graphql/dto/welcome-message.object';
import { WelcomeMessageMapper } from '@features/welcome-message/presenters/graphql/mappers/welcome-message.mapper';
import { WelcomeMessageInput } from '@features/welcome-message/presenters/graphql/dto/welcome-message.input';
import { CommandBus } from '@nestjs/cqrs';
import { WelcomeMessageService } from '@features/welcome-message/application/welcome-message.service';

@Resolver(() => WelcomeMessageObject)
export class WelcomeMessageResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly service: WelcomeMessageService,
  ) {}

  @Query(() => WelcomeMessageObject, { name: 'getWelcomeMessage' })
  async getWelcomeMessage() {
    const domain = await this.service.getMessage();

    return WelcomeMessageMapper.toObjectType(domain);
  }

  @Mutation(() => Boolean, { name: 'updateWelcomeMessage' })
  updateWelcomeMessage(@Args('input') input: WelcomeMessageInput) {
    this.service.updateMessage(input.text);

    return true;
  }
}
