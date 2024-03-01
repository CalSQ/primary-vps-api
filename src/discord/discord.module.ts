import { Module } from '@nestjs/common';
import { SERVICES } from 'src/utils/constants';
import { DiscordService } from './services/discord.service';
import { DiscordApiService } from './services/discord-api.service';
import { DiscordController } from './controllers/discord.controller';

@Module({
  imports: [],
  providers: [
    {
      provide: SERVICES.DISCORD,
      useClass: DiscordService,
    },
    {
      provide: SERVICES.DISCORD_API,
      useClass: DiscordApiService,
    },
  ],
  controllers: [DiscordController],
  exports: [],
})
export class DiscordModule {}
