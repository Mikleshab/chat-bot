import { Global, Module } from '@nestjs/common';
import { ConfigInitializer } from '@initializers/config.initializer';
import { GraphQLInitializer } from '@initializers/graphql.initializer';
import { BotInitializer } from '@initializers/bot.initializer';

@Global()
@Module({
  imports: [ConfigInitializer, GraphQLInitializer, BotInitializer],
})
export class InitializersModule {}
