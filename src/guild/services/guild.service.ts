import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import { Model } from 'mongoose';
import { IGuildService } from '../interfaces/guild';
import {
  BotGuild,
  BotGuildCreateOptions,
  BotGuildOptions,
  BotGuildUpdateOptions,
} from 'src/schemas/Guild.schema';

@Injectable()
export class GuildService implements IGuildService {
  constructor(
    @InjectModel(BotGuild.name) private guildModel: Model<BotGuild>,
  ) {}

  createGuild(guildId: string, options: BotGuildCreateOptions) {
    return this.guildModel.create({ guildId, ...options });
  }

  getGuild(guildId: string) {
    return this.guildModel.findOne({ guildId });
  }

  updateGuild(
    guildId: string,
    updateProps: BotGuildUpdateOptions,
    upsert: boolean = false,
  ) {
    return this.guildModel.findOneAndUpdate({ guildId }, updateProps, {
      new: true,
      runValidators: true,
      upsert,
    });
  }
}
