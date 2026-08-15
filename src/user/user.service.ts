import { ConflictException, Injectable } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

import { ICreateUserInput } from './types/create-user-input.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async create(data: ICreateUserInput): Promise<User> {
    try {
      return await this.userRepository.create(data);
    } catch (e: unknown) {
      if (e instanceof QueryFailedError && 'code' in e && e.code === '23505') {
        throw new ConflictException('Email already in use');
      }
      throw e;
    }
  }

  public isEmailInUse(email: string): Promise<boolean> {
    return this.userRepository.isEmailInUse(email);
  }
}
