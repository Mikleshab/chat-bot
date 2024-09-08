import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FirebaseModule } from '@features/consultant/infrastructure/firebase/firebase.module';
import { ConversationResolver } from '@features/consultant/presenters/graphql/resolvers/conversation.resolver';
import { MessageResolver } from '@features/consultant/presenters/graphql/resolvers/message.resolver';
import { SaveMemberPrivateMessageHandler } from '@features/consultant/application/commands/save-member-private-message.handler';
import { ConversationSubscriptionResolver } from '@features/consultant/presenters/graphql/resolvers/conversation.subscription';
import { ConversationUpdatedHandler } from '@features/consultant/application/events/conversation-updated.handler';
import { PubSubInitializer } from '@initializers/pub-sub.initializer';
import { MessageUpdatedHandler } from '@features/consultant/application/events/message-updated.handler';
import { MessageSubscriptionResolver } from '@features/consultant/presenters/graphql/resolvers/message.subscription';
import { GetAllConversationsHandler } from '@features/consultant/application/queries/get-all-conversations.handler';
import { GetAllClientQuestionsHandler } from '@features/consultant/application/queries/get-all-client-questions.handler';
import { GetAllRepliesHandler } from '@features/consultant/application/queries/get-all-replies.handler';
import { SaveConsultantReplyHandler } from '@features/consultant/application/commands/save-consultant-reply.handler';

const handlers = [
  GetAllConversationsHandler,
  GetAllClientQuestionsHandler,
  GetAllRepliesHandler,
  SaveMemberPrivateMessageHandler,
  SaveConsultantReplyHandler,
  MessageUpdatedHandler,
  ConversationUpdatedHandler,
];

@Module({
  providers: [
    ConversationResolver,
    MessageResolver,
    ConversationSubscriptionResolver,
    MessageSubscriptionResolver,
    ...handlers,
  ],
  imports: [CqrsModule, FirebaseModule, PubSubInitializer],
})
export class ConsultantModule {}
