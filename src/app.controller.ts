import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';

import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';

import { User } from './schemas/user.schema';
import { CreateUserDTO } from './user/dto/create-user.dto';

import { LocalAuthGuard } from './auth/guards/LocalAuth.guard';
import { JwtAuthGuard } from './auth/guards/JwtAuth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('auth/register')
  registerUser(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this.userService.createUserService(createUserDTO);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Body('emailID') emailID: string, @Body('password') password: string) {
    const payload = {
      emailID: emailID,
      password: password,
    };
    return this.authService.createJwtPayload(payload);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
