import { MigrationInterface, QueryRunner } from 'typeorm';
import { UserEntity } from '@db/entities/user.entity';

const email = 'admin@test.com';
const password = '1234';

export class firstUser1673083805802 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepo = queryRunner.manager.getRepository(UserEntity);
    const admin = userRepo.create({
      email,
      password,
      name: 'Super Admin'
    });
    await userRepo.save(admin);
    await userRepo.update({ id: admin.id }, { createdBy: admin.id });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userRepo = queryRunner.manager.getRepository(UserEntity);
    await userRepo.delete({ email });
  }
}
