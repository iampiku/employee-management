import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test')
  @UseGuards(AuthGuard('jwt'))
  guardedRoute(): { message: string } {
    return {
      message: 'you Did it',
    };
  }
}
