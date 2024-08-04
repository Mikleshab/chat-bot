import { Module, OnModuleInit } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TelegramHandler } from '@features/locations-message/presenters/telegram/telegram.handler';
import { FirebaseModule } from '@features/locations-message/infrastructure/firebase/firebase.module';
import { LocationsMessageHandler } from '@features/locations-message/application/locations-message.handler';
import { PressLocationsButtonHandler } from '@features/locations-message/application/press-locations-button.handler';

@Module({
  providers: [LocationsMessageHandler, PressLocationsButtonHandler, TelegramHandler],
  imports: [CqrsModule, FirebaseModule],
})
export class LocationsMessageModule implements OnModuleInit {
  constructor(private readonly telegramHandler: TelegramHandler) {}

  onModuleInit() {
    this.telegramHandler.listen();
  }
}
