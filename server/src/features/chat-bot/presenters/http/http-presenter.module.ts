import { Module } from '@nestjs/common';
import { GreetingsController } from './controllers/greetings.controller';

@Module({
  controllers: [GreetingsController],
  exports: [GreetingsController]
})
export class HttpPresenterModule {
}
