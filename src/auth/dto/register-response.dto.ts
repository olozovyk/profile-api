import { ApiProperty } from '@nestjs/swagger';
import { USER_ROLES, type UserRole } from 'src/user/types/user-roles.enum';

export class RegisterResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ type: 'string', nullable: true })
  firstName: string | null;

  @ApiProperty({ type: 'string', nullable: true })
  lastName: string | null;

  @ApiProperty({ enum: USER_ROLES })
  role: UserRole;

  @ApiProperty()
  emailVerified: boolean;
}
