import { LogLeftMemberHandler } from '@features/logger/application/commands/log-left-member.handler';
import { LogMemberMessageHandler } from '@features/logger/application/commands/log-member-message.handler';
import { NewGroupMemberHandler } from '@features/logger/application/commands/log-new-member.handler';
import { FirebaseModule } from '@features/logger/infrastructure/firebase/firebase.module';
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

const handlers = [NewGroupMemberHandler, LogLeftMemberHandler, LogMemberMessageHandler];

@Module({
  providers: [...handlers],
  imports: [CqrsModule, FirebaseModule],
})
export class LoggerModule {}
