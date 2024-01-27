import { Injectable } from '@nestjs/common';
import { IUserService } from '../interfaces/user';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import { Model } from 'mongoose';
import { UserDetails } from 'src/types/user';

@Injectable()
export class UserService implements IUserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createUser(userDetails: UserDetails) {
    console.log('new user: ' + userDetails.discordId);
    const newUser = await this.userModel.create(userDetails);
    return newUser;
  }

  findUser(discordId: string) {
    console.log('find user: ' + discordId);
    return this.userModel.findOne({ discordId });
  }
}
