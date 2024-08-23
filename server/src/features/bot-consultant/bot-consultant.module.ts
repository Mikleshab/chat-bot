import { Module, OnModuleInit } from '@nestjs/common';
import { TelegramHandler } from '@features/bot-consultant/presenters/telegram/telegram.handler';
import { CqrsModule } from '@nestjs/cqrs';
import { FirebaseModule } from '@features/bot-consultant/infrastructure/firebase/firebase.module';
import { ConsultantService } from '@features/bot-consultant/application/consultant.service';
import { ConversationResolver } from '@features/bot-consultant/presenters/graphql/resolvers/conversation.resolver';
import { MessageResolver } from '@features/bot-consultant/presenters/graphql/resolvers/message.resolver';
import { ClientMessageCreatedHandler } from '@features/bot-consultant/application/commands/client-message-created.handler';
import { ConversationSubscriptionResolver } from '@features/bot-consultant/presenters/graphql/resolvers/conversation.subscription';
import { ConversationUpdatedHandler } from '@features/bot-consultant/application/events/conversation-updated.handler';
import { PubSubInitializer } from '@initializers/pub-sub.initializer';
import { MessageUpdatedHandler } from '@features/bot-consultant/application/events/message-updated.handler';
import { MessageSubscriptionResolver } from '@features/bot-consultant/presenters/graphql/resolvers/message.subscription';
import { TelegramModule } from '@features/bot-consultant/infrastructure/telegram/telegram.module';

@Module({
  providers: [
    ClientMessageCreatedHandler,
    TelegramHandler,
    ConsultantService,
    ConversationResolver,
    MessageResolver,
    ConversationSubscriptionResolver,
    ConversationUpdatedHandler,
    MessageUpdatedHandler,
    MessageSubscriptionResolver,
  ],
  imports: [CqrsModule, FirebaseModule, TelegramModule, PubSubInitializer],
})
export class BotConsultantModule implements OnModuleInit {
  constructor(private readonly telegramHandler: TelegramHandler) {}

  onModuleInit() {
    this.telegramHandler.listen();
  }
}
