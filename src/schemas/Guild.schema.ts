import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from './Base.schema';
import mongoose from 'mongoose';

@Schema()
export class BotGuildOptions {
  @Prop({ required: false })
  messageLog?: string;

  @Prop({ required: false })
  memberLog?: string;

  @Prop({ required: false })
  modLog?: string;
}

@Schema()
export class BotGuild extends BaseSchema {
  @Prop({ unique: true, required: true })
  guildId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: BotGuildOptions.name })
  options?: BotGuildOptions;
}
export type BotGuildCreateOptions = Omit<BotGuild, 'guildId'>;
export type BotGuildUpdateOptions = Partial<BotGuildCreateOptions>;

export const BotGuildSchema = SchemaFactory.createForClass(BotGuild);
export const BotGuildOptionsSchema =
  SchemaFactory.createForClass(BotGuildOptions);
