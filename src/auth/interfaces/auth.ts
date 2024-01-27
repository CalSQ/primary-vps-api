import { User } from 'src/schemas/User.schema';
import { UserDetails } from 'src/types/user';

export interface IAuthService {
  validateUser(userDetails: UserDetails): Promise<User>;
}
