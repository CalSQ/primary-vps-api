import { UserDoc } from 'src/schemas/User.schema';
import { PartialUserDetails, UserDetails } from '../types/user';

export interface IUserService {
  createUser(userDetails: UserDetails): Promise<UserDoc>;
  findUser(discordId: string): Promise<UserDoc | undefined>;
  updateUser(
    discordId: string,
    updateProps: PartialUserDetails,
    upsert?: boolean,
  ): Promise<UserDoc | undefined>;
}
