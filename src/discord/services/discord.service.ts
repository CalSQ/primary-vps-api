import { Inject, Injectable } from '@nestjs/common';
import { IDiscordService } from '../interfaces/discord';
import { PERMISSION_FLAGS, SERVICES } from 'src/utils/constants';
import { IDiscordApiService } from '../interfaces/discord-api';

@Injectable()
export class DiscordService implements IDiscordService {
  constructor(
    @Inject(SERVICES.DISCORD_API)
    private readonly discordApiService: IDiscordApiService,
  ) {}
  async getUserGuilds(accessToken: string) {
    return await this.discordApiService.fetchUserGuilds(accessToken);
  }
  async getBotGuilds() {
    return await this.discordApiService.fetchBotGuilds();
  }
  async getMutualGuilds(accessToken: string) {
    const userGuilds = await this.getUserGuilds(accessToken);
    const botGuilds = await this.getBotGuilds();
    const [availableGuilds, unavailableGuilds] = userGuilds.reduce(
      (result, userGuild) => {
        if (
          (parseInt(userGuild.permissions) & PERMISSION_FLAGS.MANAGE_GUILD) ===
          PERMISSION_FLAGS.MANAGE_GUILD
        ) {
          result[
            botGuilds.some((botGuild) => botGuild.id === userGuild.id) ? 0 : 1
          ].push(userGuild);
        }

        return result;
      },
      [[], []],
    );
    return { available: availableGuilds, unavailable: unavailableGuilds };
  }
}
