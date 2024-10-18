import { Module } from '@nestjs/common';
import { FirebaseModule } from './infrastructure/firefase/firebase.module';
import { CqrsModule } from '@nestjs/cqrs';
import { ChatResolver } from '@features/chat/presenters/grqphql/resolvers/chat.resolver';
import { GetAllChatsHandler } from '@features/chat/application/queries/get-all-chats.handler';

const handlers = [GetAllChatsHandler];

@Module({
  providers: [ChatResolver, ...handlers],
  imports: [CqrsModule, FirebaseModule],
})
export class ChatsModule {}
