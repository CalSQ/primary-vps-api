import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/schemas/User.schema';
import { IUserService } from 'src/user/interfaces/user';
import { SERVICES } from 'src/utils/constants';

type Done = (err: Error, user: User) => void;

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject(SERVICES.USER) private readonly userService: IUserService,
  ) {
    super();
  }

  serializeUser(user: User, done: Done) {
    console.log('serialize', user);
    done(null, user);
  }

  async deserializeUser(user: User, done: Done) {
    try {
      console.log('deserialize', user);
      const userData = await this.userService.findUser(user.discordId);
      return userData ? done(null, userData) : done(null, null);
    } catch (err) {
      done(err, null);
    }
  }
}
