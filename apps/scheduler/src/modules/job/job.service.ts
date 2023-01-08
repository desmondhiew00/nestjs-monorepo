import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '@db/entities/user.entity';
import { OneWaySmsService } from '@lib/onewaysms';

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly smsService: OneWaySmsService
  ) {}

  async getUsers() {
    this.smsService
      .sendSms({
        to: '+123123123',
        message: 'asdasdasdd'
      })
      .then(() => console.log('sms sent'))
      .catch((e) => console.log(e.message));

    const users = await this.userRepo.find({ select: ['id', 'email'] });
    return users;
  }
}
