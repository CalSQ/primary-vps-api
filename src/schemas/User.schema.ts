import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './Base.schema';

@Schema()
export class User extends BaseSchema {
  // @Prop({ type: mongoose.Schema.Types.ObjectId })
  // _id: string;

  @Prop({ unique: true })
  discordId: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
