import { WelcomeMessageDomain } from '@features/welcome-message/domain/welcome-message.domain';

export abstract class WelcomeMessageRepository {
  abstract getMessage(): Promise<object>;

  abstract updateMessage(message: WelcomeMessageDomain): Promise<void>;
}
