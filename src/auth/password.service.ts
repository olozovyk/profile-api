import { Injectable } from '@nestjs/common';
import argon2 from 'argon2';

@Injectable()
export class PasswordService {
  public hash(password: string): Promise<string> {
    return argon2.hash(password);
  }

  public verify(hash: string, password: string): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}
