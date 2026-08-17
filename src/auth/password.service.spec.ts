import { PasswordService } from './password.service';

describe('PasswordService', () => {
  let passwordService: PasswordService;

  beforeEach(() => {
    passwordService = new PasswordService();
  });

  it('should start with argon2', async () => {
    const hash = await passwordService.hash('test_password');
    expect(hash).toMatch(/^\$argon2id/);
  });

  it('should verify password with hash', async () => {
    const password = 'test_password';
    const hash = await passwordService.hash(password);
    const verified = await passwordService.verify(hash, password);
    expect(verified).toBe(true);
  });

  it('should not verify wrong password', async () => {
    const hash = await passwordService.hash('test_password');
    const verified = await passwordService.verify(hash, 'wrong_password');
    expect(verified).toBe(false);
  });
});
