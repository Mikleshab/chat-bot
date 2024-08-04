import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { StartPrivateChatButtonHandler } from '@features/start-private-chat-message/application/start-private-chat-button.handler';
import { StartPrivateChatMessageHandler } from '@features/start-private-chat-message/application/start-private-chat-message.handler';
import { FirebaseModule } from '@features/start-private-chat-message/infrastructure/firebase/firebase.module';
import { TelegramHandler } from '@features/start-private-chat-message/presenters/telegram/telegram.handler';

@Module({
  providers: [StartPrivateChatMessageHandler, StartPrivateChatButtonHandler, TelegramHandler],
  imports: [CqrsModule, FirebaseModule],
})
export class StartPrivateChatMessageModule implements OnModuleInit {
  constructor(private readonly telegramHandler: TelegramHandler) {}

  onModuleInit() {
    this.telegramHandler.listen();
  }
}
