import { Module } from '@nestjs/common';
import { TelegramConfigInitializer } from './config';

@Module({
  imports: [TelegramConfigInitializer],
  exports: [TelegramConfigInitializer]
})
export class TelegramPresenterModule {

}
