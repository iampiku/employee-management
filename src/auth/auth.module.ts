import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';

import { UserSchema } from 'src/schemas/user.schema';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, LocalStrategy],
  imports: [
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
    PassportModule,
    JwtModule.register({
      secret: 'mysecretkey',
      signOptions: { expiresIn: '3600s' },
    }),
    UserModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
