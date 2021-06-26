import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

export enum EventType {
  CREATED = "CREATED",
  UPDATED = "UPDATED",
  DELETED = "DELETED",
  SYNCRONIZED = "SYNCRONIZED"
}

@Schema()
export class User {

  _id: string;

  @Prop()
  id: number;

  @Prop()
  email: string;

  @Prop()
  appId: string;

  @Prop()
  seed: string;

  @Prop()
  currentStatus: EventType;

}

export const UserSchema = SchemaFactory.createForClass(User);
