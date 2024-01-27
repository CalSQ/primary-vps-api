import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-discord';
import { SERVICES } from '../../utils/constants';
import { IAuthService } from 'src/auth/interfaces/auth';

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(SERVICES.AUTH) private readonly authService: IAuthService,
  ) {
    super({
      clientID: process.env.DISCORD_APP_ID,
      clientSecret: process.env.DISCORD_APP_SECRET,
      callbackURL: process.env.DISCORD_APP_REDIRECT,
      scope: ['identify', 'guilds'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log('strategory: ' + profile.username);
    return this.authService.validateUser({ discordId: profile.id });
  }
}
