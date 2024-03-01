import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/User.schema';
import { Model } from 'mongoose';
import { IUserService } from '../interfaces/user';
import { PartialUserDetails, UserDetails } from '../types/user';

@Injectable()
export class UserService implements IUserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  createUser(userDetails: UserDetails) {
    return this.userModel.create(userDetails);
  }
  findUser(discordId: string) {
    return this.userModel.findOne({ discordId });
  }
  updateUser(
    discordId: string,
    updateProps: PartialUserDetails,
    upsert: boolean = false,
  ) {
    return this.userModel.findOneAndUpdate({ discordId }, updateProps, {
      upsert: upsert,
    });
  }
}
