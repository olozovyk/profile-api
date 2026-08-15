import { ConflictException, Injectable } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

import { CreateUserDto } from './dto/create-user.dto';
import { EmailVerificationService } from './email-verification.service';
import { PasswordService } from './password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly emailVerificationService: EmailVerificationService,
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
  ) {}

  public async register(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;

    const isEmailInUse = await this.userService.isEmailInUse(userData.email);

    if (isEmailInUse) {
      throw new ConflictException('Email already in use');
    }

    const passwordHash = await this.passwordService.hash(password);

    const emailVerificationToken = this.emailVerificationService.getToken();
    const emailVerificationExpires =
      this.emailVerificationService.getTokenExpiresDate();

    const user = await this.userService.create({
      ...userData,
      passwordHash,
      emailVerificationToken,
      emailVerificationExpires,
    });

    return user;
  }
}
