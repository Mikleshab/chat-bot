import { Global, Module } from '@nestjs/common';
import { ConfigInitializer } from '@initializers/config.initializer';
import { GraphQLInitializer } from '@initializers/graphql.initializer';

@Global()
@Module({
  imports: [ConfigInitializer, GraphQLInitializer],
})
export class InitializersModule {}
