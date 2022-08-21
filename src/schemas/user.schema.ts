import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserRole } from 'src/enum/user-role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  readonly name: string;

  @Prop({ required: true, unique: true })
  readonly emailID: string;

  @Prop()
  address: string;

  @Prop({ required: true, unique: true })
  password: string;

  @Prop({ required: true, default: UserRole['EMPLOYEE'] })
  userType: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
