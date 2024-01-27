import { Inject, Injectable } from '@nestjs/common';
import { IUserService } from 'src/user/interfaces/user';
import { SERVICES } from 'src/utils/constants';
import { IAuthService } from '../interfaces/auth';
import { UserDetails } from 'src/types/user';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(SERVICES.USER) private readonly userService: IUserService,
  ) {}

  async validateUser(userDetails: UserDetails) {
    const user = await this.userService.findUser(userDetails.discordId);
    if (!user) return this.userService.createUser(userDetails);
    return user;
  }
}
