import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module, UnauthorizedException } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import * as admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';
import { ConfigService } from '@nestjs/config';
import { AuthConfig } from 'src/core/auth/config/config.schema';
import process from 'node:process';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AuthConfig>) => {
        return {
          autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
          sortSchema: true,
          introspection: process.env.NODE_ENV !== 'production',
          subscriptions: {
            'graphql-ws': {
              onConnect: async (context) => {
                const { connectionParams } = context;

                const token = connectionParams?.['token'];

                if (!token) {
                  throw new UnauthorizedException('No token provided.');
                }

                let user: DecodedIdToken | null = null;

                try {
                  user = await admin.auth().verifyIdToken(token as string);
                } catch (error) {
                  throw new UnauthorizedException('Invalid token.');
                }

                const allowedEmail = configService.get<string>('adminEmail', '');

                if (user?.email !== allowedEmail) {
                  throw new UnauthorizedException('Access denied.');
                }
              },
            },
          },
        };
      },
    }),
  ],
})
export class GraphQLInitializer {}
