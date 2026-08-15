import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { USER_GROUPS } from './types/user-field-groups.enum';
import { USER_ROLES, type UserRole } from './types/user-roles.enum';

@Entity('users')
export class User {
  @Expose({ groups: [USER_GROUPS.BASE] })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose({ groups: [USER_GROUPS.BASE] })
  @Column({ unique: true, length: 255 })
  email: string;

  @Exclude()
  @Column({ name: 'password_hash' })
  passwordHash: string;

  @Expose({ groups: [USER_GROUPS.BASE] })
  @Column({ nullable: true, type: 'varchar', length: 100, name: 'first_name' })
  firstName: string | null;

  @Expose({ groups: [USER_GROUPS.BASE] })
  @Column({ nullable: true, type: 'varchar', length: 100, name: 'last_name' })
  lastName: string | null;

  @Expose({ groups: [USER_GROUPS.ROLE] })
  @Column({
    type: 'enum',
    enum: USER_ROLES,
    default: 'user',
    name: 'user_role',
  })
  role: UserRole;

  @Expose({ groups: [USER_GROUPS.EMAIL] })
  @Column({ default: false, name: 'email_verified' })
  emailVerified: boolean;

  @Exclude()
  @Column({ nullable: true, type: 'varchar', name: 'email_verification_token' })
  emailVerificationToken: string | null;

  @Exclude()
  @Column({
    nullable: true,
    type: 'timestamptz',
    name: 'email_verification_expires',
  })
  emailVerificationExpires: Date | null;

  @Expose({ groups: [USER_GROUPS.AVATAR] })
  @Column({ nullable: true, type: 'varchar', name: 'avatar_url' })
  avatarUrl: string | null;

  @Exclude()
  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ nullable: true, type: 'timestamptz', name: 'deleted_at' })
  deletedAt: Date | null;
}
