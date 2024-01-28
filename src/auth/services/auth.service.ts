import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from 'src/user/interfaces/user';
import { SERVICES } from 'src/utils/constants';
import { IAuthService } from '../interfaces/auth';
import {
  encryptTokens,
  exchangeCodeForAccessToken,
  fetchUserProfile,
} from '../utils/helpers';
import { Request } from 'express';
import { SessionSerializer } from './session.service';
import { UserDetails } from 'src/user/types/user';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(SERVICES.SERIALIZER)
    private readonly sessionSerializer: SessionSerializer,
    @Inject(SERVICES.USER) private readonly userService: IUserService,
  ) {}

  async validateUser(userDetails: UserDetails) {
    const { discordId, ...updateProps } = userDetails;
    const user = await this.userService.updateUser(
      discordId,
      updateProps,
      true,
    );
    return user;
  }

  async authenticateUser(request: Request, accessCode: string) {
    const oauthCredentials = await exchangeCodeForAccessToken(accessCode);
    const {
      token_type: tokenType,
      access_token: accessToken,
      refresh_token: refreshToken,
    } = oauthCredentials;
    const { id: discordId } = await fetchUserProfile(accessToken, tokenType);
    const tokens = encryptTokens(accessToken, refreshToken);
    const userData = await this.validateUser({ discordId });
    await this.sessionSerializer.serialize(request, {
      discordId: userData.discordId,
      tokens,
    });
  }
}
