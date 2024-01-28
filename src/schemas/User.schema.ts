import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './Base.schema';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User extends BaseSchema {
  // @Prop({ type: mongoose.Schema.Types.ObjectId })
  // _id: string;

  @Prop({ required: true, unique: true })
  discordId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDoc = HydratedDocument<User>;
