import {
  IsAlpha,
  IsAlphanumeric,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @IsAlpha()
  @IsNotEmpty({ message: 'User must provide a username' })
  @MaxLength(20)
  @ApiProperty()
  userName: string;

  @IsEmail()
  @IsNotEmpty({ message: 'User must provide an emailID' })
  @ApiProperty()
  emailID: string;

  @IsAlphanumeric()
  @ApiProperty()
  address: string;

  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty()
  password: string;

  @IsAlpha()
  @IsNotEmpty({ message: 'User role must be defined' })
  @ApiProperty({ enum: ['Admin', 'User'] })
  userType: string;
}
