import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUser1673189110357 implements MigrationInterface {
  name = 'updateUser1673189110357';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`user\`
            ADD \`forgotPasswordToken\` varchar(255) NULL AFTER fcmToken
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`user\` DROP COLUMN \`forgotPasswordToken\`
        `);
  }
}
