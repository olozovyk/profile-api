import { Body, Controller, Post, SerializeOptions } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
import { USER_GROUPS } from 'src/user/types/user-field-groups.enum';

import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { RegisterResponseDto } from './dto/register-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @SerializeOptions({
    groups: [USER_GROUPS.BASE, USER_GROUPS.EMAIL, USER_GROUPS.ROLE],
  })
  @ApiCreatedResponse({
    type: RegisterResponseDto,
    description: 'User created',
  })
  @ApiBadRequestResponse({ description: 'Validation failed' })
  @ApiConflictResponse({ description: 'Email already in use' })
  public register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<RegisterResponseDto> {
    return this.authService.register(createUserDto);
  }
}
