import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { OAuth2Client } from 'google-auth-library';
import { ConfigService } from '@nestjs/config';
import { IncomingMessage } from 'node:http';
import { TokenPayload } from 'google-auth-library/build/src/auth/loginticket';
import { AuthConfig } from './config/config.schema';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly googleClientId: string;
  private readonly allowedEmail: string;
  private client: OAuth2Client;

  constructor(configService: ConfigService<AuthConfig>) {
    this.allowedEmail = configService.get<string>('adminEmail', '');
    this.googleClientId = configService.get<string>('googleClientId', '');
    this.client = new OAuth2Client(this.googleClientId);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext<{ req: IncomingMessage; user?: TokenPayload }>();
    const { token } = ctx.req.headers;

    if (!token) {
      throw new UnauthorizedException('No token provided.');
    }

    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token as string,
        audience: this.googleClientId,
      });

      ctx.user = ticket.getPayload();
    } catch (error: unknown) {
      throw new UnauthorizedException('Invalid token.');
    }

    if (ctx.user?.email !== this.allowedEmail) {
      throw new UnauthorizedException('Access denied.');
    }

    return true;
  }
}
