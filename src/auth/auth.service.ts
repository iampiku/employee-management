import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

import * as bcrypt from 'bcrypt';

import { User } from 'src/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(emailID: string, password: string): Promise<User> {
    const user: User = await this.userService.findUserByEmailService(emailID);
    const passwordCheck: boolean = await bcrypt.compare(
      password,
      user.password,
    );

    if (user && passwordCheck) return user;
    else throw new BadRequestException('Invalid Password');
  }

  async validateUserJwt(payload: any): Promise<string> {
    const user = await this.userService.findUserByEmailService(payload.emailID);
    if (user) return this.jwtService.sign(user);
    else throw new UnauthorizedException('inside ValidateUserJwt');
  }

  async createJwtPayload(
    user: Partial<User>,
  ): Promise<{ access_token: string }> {
    const payload = {
      emailID: user.emailID,
      name: user.name,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
