import { Module, OnModuleInit } from '@nestjs/common';
import { TelegramHandler } from '@features/welcome-message/presenters/telegram/telegram.handler';
import { NewChatMemberHandler } from '@features/welcome-message/application/new-chat-member.handler';
import { WelcomeMessageHandler } from '@features/welcome-message/application/welcome-message.handler';
import { FirebaseModule } from '@features/welcome-message/infrastructure/firebase/firebase.module';
import { CqrsModule } from '@nestjs/cqrs';
import { WelcomeMessageService } from '@features/welcome-message/application/welcome-message.service';
import { WelcomeMessageResolver } from '@features/welcome-message/presenters/graphql/resolvers/welcome-message.resolver';

@Module({
  providers: [
    NewChatMemberHandler,
    WelcomeMessageHandler,
    TelegramHandler,
    WelcomeMessageService,
    WelcomeMessageResolver,
  ],
  imports: [CqrsModule, FirebaseModule],
})
export class WelcomeMessageModule implements OnModuleInit {
  constructor(private readonly telegramHandler: TelegramHandler) {}

  onModuleInit() {
    this.telegramHandler.listen();
  }
}
