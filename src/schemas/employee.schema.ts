import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EmployeeRole } from 'src/enum/employee-role.enum';

export type EmployeeDocument = Employee & Document;

@Schema()
export class Employee {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  emailID: string;

  @Prop()
  address: string;

  @Prop({ required: true, default: EmployeeRole['Junior Developer'] })
  role: string;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
