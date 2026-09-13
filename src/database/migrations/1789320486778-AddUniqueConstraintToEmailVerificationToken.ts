import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUniqueConstraintToEmailVerificationToken1789320486778 implements MigrationInterface {
  name = 'AddUniqueConstraintToEmailVerificationToken1789320486778';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_baf4ca2a5aa907023a2f3748be1" UNIQUE ("email_verification_token")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_baf4ca2a5aa907023a2f3748be1"`,
    );
  }
}
