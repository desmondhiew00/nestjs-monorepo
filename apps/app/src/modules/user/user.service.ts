import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@lib/database/entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>
  ) {}

  public async create(user) {
    try {
      const data = this.usersRepository.create(user);
      const result = await this.usersRepository.save(data);
      return result;
    } catch (e) {
      return e.message;
    }
  }

  public list() {
    return this.usersRepository.find();
  }
}
