import { Module } from '@nestjs/common';
import { FeaturesModule } from '@features';
import { InitializersModule } from '@initializers';

@Module({
  imports: [InitializersModule, FeaturesModule],
})
export class AppModule {
}
