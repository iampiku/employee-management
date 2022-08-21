import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  @IsNotEmpty({ message: 'firstname cannot be empty' })
  @IsAlpha()
  @ApiProperty()
  readonly firstname: string;

  @IsString()
  @IsNotEmpty({ message: 'lastname cannot be empty' })
  @IsAlpha()
  @ApiProperty()
  readonly lastname: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email cannot be empty' })
  @ApiProperty()
  readonly emailID: string;

  @IsAlphanumeric()
  @ApiProperty()
  readonly address: string;

  @IsAlpha()
  @IsNotEmpty({ message: 'User role cannot be empty' })
  @ApiProperty({ enum: ['Developer', 'QA', 'DevOps', 'Manager'] })
  readonly role: string;
}
