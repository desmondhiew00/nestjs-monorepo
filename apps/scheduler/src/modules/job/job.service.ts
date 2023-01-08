import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@db/entities/user.entity';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>
  ) {}

  async getUsers() {
    const users = await this.userRepo.find({ select: ['id', 'email'] });
    return users;
  }
}
