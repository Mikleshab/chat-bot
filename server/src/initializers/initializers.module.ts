import { Module } from '@nestjs/common';
import { ConfigInitializer } from './config.initializer';

@Module({
  imports: [ConfigInitializer],
})
export class InitializersModule {
}
