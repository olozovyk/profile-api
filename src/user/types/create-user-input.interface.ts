export interface ICreateUserInput {
  email: string;
  firstName?: string;
  lastName?: string;
  passwordHash: string;
  emailVerificationToken: string;
  emailVerificationExpires: Date;
}
