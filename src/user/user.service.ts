import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDTO } from './dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private userModel: Model<User>) {}

  async createUserService(createUserDTO: CreateUserDTO): Promise<User> {
    const hashedPassword = await hash(createUserDTO.password, 10);
    createUserDTO.password = hashedPassword;
    return new this.userModel(createUserDTO).save();
  }

  async findUserByEmailService(emailID: string): Promise<User> {
    const user = await this.userModel.findOne({ emailID }).exec();
    if (!user)
      throw new NotFoundException("User emailID doesn't exist in the database");
    return user;
  }
}
