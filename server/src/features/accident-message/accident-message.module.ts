import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PressAccidentButtonCommand } from '@features/accident-message/application/press-accident-button.command';
import { AccidentMessageHandler } from '@features/accident-message/application/accident-message.handler';
import { TelegramHandler } from '@features/accident-message/presenters/telegram/telegram.handler';
import { FirebaseModule } from '@features/accident-message/infrastructure/firebase/firebase.module';

@Module({
  providers: [AccidentMessageHandler, PressAccidentButtonCommand, TelegramHandler],
  imports: [CqrsModule, FirebaseModule],
})
export class AccidentMessageModule implements OnModuleInit {
  constructor(private readonly telegramHandler: TelegramHandler) {}

  onModuleInit() {
    this.telegramHandler.listen();
  }
}
