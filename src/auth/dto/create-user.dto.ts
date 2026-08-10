import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ToLowerCase } from 'src/common/decorators/to-lower-case.decorator';
import { Trim } from 'src/common/decorators/trim.decorator';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ToLowerCase()
  @Trim()
  @MaxLength(255)
  email: string;

  @IsString()
  @IsNotEmpty()
  @Trim()
  @MinLength(6)
  @MaxLength(100)
  password: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Trim()
  @MinLength(1)
  @MaxLength(100)
  firstName?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Trim()
  @MinLength(1)
  @MaxLength(100)
  lastName?: string;
}
