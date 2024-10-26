import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';
import { IncomingMessage } from 'node:http';
import { AuthConfig } from './config/config.schema';
import * as admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly allowedEmail: string;

  constructor(configService: ConfigService<AuthConfig>) {
    this.allowedEmail = configService.get<string>('adminEmail', '');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext<{ req: IncomingMessage; user?: DecodedIdToken }>();
    const { token } = ctx.req.headers;

    if (!token) {
      throw new UnauthorizedException('No token provided.');
    }

    try {
      ctx.user = await admin.auth().verifyIdToken(token as string);
    } catch (error) {
      console.log('AuthGuard', JSON.stringify(error));
      throw new UnauthorizedException('Invalid token.');
    }

    if (ctx.user?.email !== this.allowedEmail) {
      throw new UnauthorizedException('Access denied.');
    }

    return true;
  }
}
