import { WelcomeMessageDomain } from '@features/welcome-message/domain/welcome-message.domain';
import { WelcomeMessageObject } from '@features/welcome-message/presenters/graphql/dto/welcome-message.object';

export class WelcomeMessageMapper {
  static toObjectType(domain: WelcomeMessageDomain): WelcomeMessageObject {
    return new WelcomeMessageObject(domain.text);
  }
}
