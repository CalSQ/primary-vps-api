import { Injectable } from '@nestjs/common';
import { IUserService } from '../interfaces/user';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import { Model } from 'mongoose';
import { PartialUserDetails, UserDetails } from '../types/user';

@Injectable()
export class UserService implements IUserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createUser(userDetails: UserDetails) {
    const newUser = await this.userModel.create(userDetails);
    return newUser;
  }

  async updateUser(
    discordId: string,
    updateProps: PartialUserDetails,
    upsert?: boolean,
  ) {
    return this.userModel.findOneAndUpdate({ discordId }, updateProps, {
      upsert,
      new: true,
    });
  }

  findUser(discordId: string) {
    return this.userModel.findOne({ discordId });
  }
}
