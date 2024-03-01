import { HydratedDocument } from 'mongoose';
import {
  BotGuild,
  BotGuildCreateOptions,
  BotGuildOptions,
  BotGuildUpdateOptions,
} from 'src/schemas/Guild.schema';

export interface IGuildService {
  createGuild(
    guildId: string,
    options: BotGuildCreateOptions,
  ): Promise<HydratedDocument<BotGuild>>;
  getGuild(guildId: string): Promise<HydratedDocument<BotGuild>>;
  updateGuild(
    guildId: string,
    updateProps: BotGuildUpdateOptions,
    upsert?: boolean,
  ): Promise<HydratedDocument<BotGuild>>;
}
