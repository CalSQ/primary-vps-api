import { Module } from '@nestjs/common';
import { SERVICES } from 'src/utils/constants';
import { MongooseModule } from '@nestjs/mongoose';
import { GuildService } from './services/guild.service';
import { GuildController } from './controllers/guild.controller';
import { BotGuild, BotGuildSchema } from 'src/schemas/Guild.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: BotGuild.name,
        schema: BotGuildSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: SERVICES.GUILD,
      useClass: GuildService,
    },
  ],
  controllers: [GuildController],
  exports: [],
})
export class GuildsModule {}
