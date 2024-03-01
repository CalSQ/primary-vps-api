import { HttpStatus, Injectable } from '@nestjs/common';
import {
  IDiscordApiService,
  UserGuildResponse,
} from '../interfaces/discord-api';
import { buildOAuthHeaders } from 'src/auth/utils/helpers';
import { API_ROUTES } from 'src/utils/constants';

@Injectable()
export class DiscordApiService implements IDiscordApiService {
  async fetchUserGuilds(accessToken: string): Promise<UserGuildResponse[]> {
    const response = await fetch(API_ROUTES.USER_GUILDS, {
      headers: buildOAuthHeaders(accessToken),
    });
    if (response.status !== HttpStatus.OK)
      throw new Error('Problem fetching user guilds', { cause: 'Application' });
    return await response.json();
  }

  async fetchBotGuilds(): Promise<UserGuildResponse[]> {
    const response = await fetch(API_ROUTES.USER_GUILDS, {
      headers: buildOAuthHeaders(process.env.DISCORD_BOT_TOKEN, 'Bot'),
    });
    if (response.status !== HttpStatus.OK)
      throw new Error('Problem fetching bot guilds', { cause: 'Application' });
    return await response.json();
  }
}
