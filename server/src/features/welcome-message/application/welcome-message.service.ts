import { Injectable } from '@nestjs/common';
import { WelcomeMessageDomain } from '@features/welcome-message/domain/welcome-message.domain';
import { WelcomeMessageRepository } from '@features/welcome-message/application/welcome-message.repository';

@Injectable()
export class WelcomeMessageService {
  constructor(private readonly repository: WelcomeMessageRepository) {}

  async getMessage(): Promise<WelcomeMessageDomain> {
    const json = await this.repository.getMessage();

    return WelcomeMessageDomain.create(WelcomeMessageDomain, json);
  }

  async updateMessage(text: string): Promise<void> {
    const message = WelcomeMessageDomain.create(WelcomeMessageDomain, { text });

    await this.repository.updateMessage(message);
  }
}
