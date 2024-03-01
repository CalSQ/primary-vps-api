import { UserGuildResponse } from './discord-api';

export interface IDiscordService {
  getUserGuilds(accessToken: string): Promise<UserGuildResponse[]>;
  getBotGuilds(): Promise<UserGuildResponse[]>;
  getMutualGuilds(accessToken: string): void;
}
