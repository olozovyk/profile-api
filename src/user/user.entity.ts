import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export const USER_ROLES = ['user', 'moderator', 'admin'] as const;
export type UserRole = (typeof USER_ROLES)[number];

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true, length: 100, name: 'first_name' })
  firstName: string | null;

  @Column({ nullable: true, length: 100, name: 'last_name' })
  lastName: string | null;

  @Column({
    type: 'enum',
    enum: USER_ROLES,
    default: 'user',
    name: 'user_role',
  })
  role: UserRole;

  @Column({ default: false, name: 'email_verified' })
  emailVerified: boolean;

  @Column({ nullable: true, name: 'email_verification_token' })
  emailVerificationToken: string | null;

  @Column({ nullable: true, name: 'email_verification_expires' })
  emailVerificationExpires: Date | null;

  @Column({ nullable: true, name: 'avatar_url' })
  avatarUrl: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ nullable: true, name: 'deleted_at' })
  deletedAt: Date | null;
}
