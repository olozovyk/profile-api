import { Body, Controller, Post, SerializeOptions } from '@nestjs/common';
import { USER_GROUPS } from 'src/user/types/user-field-groups.enum';
import { User } from 'src/user/user.entity';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @SerializeOptions({
    groups: [USER_GROUPS.BASE, USER_GROUPS.EMAIL, USER_GROUPS.ROLE],
  })
  public register(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.authService.register(createUserDto);
  }
}
