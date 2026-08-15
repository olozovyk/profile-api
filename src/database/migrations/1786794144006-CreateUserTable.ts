import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserTable1786794144006 implements MigrationInterface {
  name = 'CreateUserTable1786794144006';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_user_role_enum" AS ENUM('user', 'moderator', 'admin')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(255) NOT NULL, "password_hash" character varying NOT NULL, "first_name" character varying(100), "last_name" character varying(100), "user_role" "public"."users_user_role_enum" NOT NULL DEFAULT 'user', "email_verified" boolean NOT NULL DEFAULT false, "email_verification_token" character varying, "email_verification_expires" TIMESTAMP WITH TIME ZONE, "avatar_url" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TYPE "public"."users_user_role_enum"`);
  }
}
