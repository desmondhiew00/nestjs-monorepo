import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1673083748715 implements MigrationInterface {
  name = 'init1673083748715';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`user\` (
                \`id\` int UNSIGNED NOT NULL AUTO_INCREMENT,
                \`email\` varchar(50) NOT NULL,
                \`name\` varchar(150) NOT NULL,
                \`phoneNo\` varchar(20) NULL,
                \`password\` varchar(255) NOT NULL,
                \`avatar\` varchar(255) NULL,
                \`refreshToken\` varchar(255) NULL,
                \`fcmToken\` varchar(255) NULL,
                \`active\` tinyint NOT NULL DEFAULT 1,
                \`createdBy\` int UNSIGNED NULL,
                \`updatedBy\` int UNSIGNED NULL,
                \`deletedBy\` int UNSIGNED NULL,
                \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`deletedAt\` datetime(6) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            ALTER TABLE \`user\`
            ADD CONSTRAINT \`FK_82319f64187836b307e6d6ba08d\` FOREIGN KEY (\`createdBy\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_82319f64187836b307e6d6ba08d\`
        `);
    await queryRunner.query(`
            DROP TABLE \`user\`
        `);
  }
}
