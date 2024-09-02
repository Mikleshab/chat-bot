import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FirebaseModule } from './infrastructure/firefase/firebase.module';
import { GetChatEventByTypeHandler } from './application/queries/get-chat-event-by-type.handler';
import { GetAllChatEventsHandler } from './application/queries/get-all-chat-events.handler';
import { AddChatEventHandler } from './application/commands/add-chat-event.handler';
import { RemoveChatEventHandler } from './application/commands/remove-chat-event.handler';
import { GetChatEventByAnnouncementIdHandler } from './application/queries/get-chat-event-by-announcement-id.handler';
import { ChatEventResolver } from './presenters/graphql/resolvers/chat-event.resolver';

const handlers = [
  GetChatEventByTypeHandler,
  GetAllChatEventsHandler,
  GetChatEventByAnnouncementIdHandler,
  AddChatEventHandler,
  RemoveChatEventHandler,
];

@Module({
  providers: [ChatEventResolver, ...handlers],
  imports: [CqrsModule, FirebaseModule],
})
export class ChatEventsModule {}
