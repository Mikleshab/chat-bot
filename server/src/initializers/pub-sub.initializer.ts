import { Module } from '@nestjs/common';
import { PubSub, PubSubEngine } from 'graphql-subscriptions';
import { EventEmitter } from 'events';

@Module({
  providers: [
    {
      provide: PubSubEngine,
      useFactory: async () => {
        const eventEmitter = new EventEmitter();
        eventEmitter.setMaxListeners(10);

        return new PubSub({ eventEmitter });
      },
    },
  ],
  exports: [PubSubEngine],
})
export class PubSubInitializer {}
