import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ROUTES, SERVICES } from 'src/utils/constants';

@Controller(ROUTES.GUILD)
export class GuildController {
  constructor(@Inject(SERVICES.GUILD) private guildsService) {}

  @Get(':guildId')
  getGuild(@Param('guildId') guildId: string) {
    return this.guildsService.getGuild(guildId);
  }
}
