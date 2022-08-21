import { BadRequestException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/schemas/user.schema';

import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authservice: AuthService) {
    super({ usernameField: 'emailID' });
  }

  async validate(emailID: string, password: string): Promise<User> {
    const user = await this.authservice.validateUser(emailID, password);
    if (!user) throw new BadRequestException('Inside Validate User');
    return user;
  }
}
