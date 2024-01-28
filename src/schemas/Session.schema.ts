import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Session {
  @Prop({ required: true, unique: true })
  sessionId: string;

  @Prop()
  expiresAt: Date;

  @Prop()
  data: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
export type SessionDoc = HydratedDocument<Session>;
