import { Module } from '@nestjs/common';
import { PubSub, PubSubEngine } from 'graphql-subscriptions';

@Module({
  providers: [
    {
      provide: PubSubEngine,
      useFactory: async () => {
        return new PubSub();
      },
    },
  ],
  exports: [PubSubEngine],
})
export class PubSubInitializer {}
