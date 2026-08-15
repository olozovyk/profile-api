import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ICreateUserInput } from './types/create-user-input.interface';
import { User } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  public create(data: ICreateUserInput): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  public isEmailInUse(email: string): Promise<boolean> {
    return this.userRepository.exists({ where: { email } });
  }
}
