import { User } from 'src/schemas/User.schema';
import { UserDetails } from 'src/types/user';

export interface IUserService {
  createUser(userDetails: UserDetails): Promise<User>;
  findUser(discordId: string): Promise<User | undefined>;
}
