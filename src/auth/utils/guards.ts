import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class DiscordAuthGuard extends AuthGuard('discord') {
  async canActive(ctx: ExecutionContext) {
    const activate = (await super.canActivate(ctx)) as boolean;
    const req = ctx.switchToHttp().getRequest();
    await super.logIn(req);
    return activate;
  }
}
