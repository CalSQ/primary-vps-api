import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { AuthUser } from 'src/auth/utils/decorators';
import { AuthGuard } from 'src/auth/utils/guards';
import { UserSession } from 'src/user/types/user';
import { ROUTES, SERVICES } from 'src/utils/constants';

@Controller(ROUTES.DISCORD)
export class DiscordController {
  constructor(@Inject(SERVICES.DISCORD) private discordService) {}
  @Get('guilds')
  @UseGuards(AuthGuard)
  getGuilds(@AuthUser() user: UserSession) {
    return this.discordService.getMutualGuilds(user.tokens.accessToken);
  }
}
