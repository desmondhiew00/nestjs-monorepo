import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from '@db/dto/user.dto';
import { UserEntity } from '@db/entities/user.entity';
import { EncryptionService } from '@lib/encryption';

import type { AuthData } from '../../types';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly encryption: EncryptionService,
    private readonly mailService: MailService
  ) {}

  public async create(input: CreateUserDto, authData: AuthData) {
    try {
      let password = input.password;
      let hashedPassword = '';

      if (password) {
        hashedPassword = await this.encryption.hashPassword(input.password);
      } else {
        const generated = await this.encryption.generatePassword();
        password = generated.password;
        hashedPassword = generated.hashedPassword;
      }

      const data = this.usersRepository.create({
        ...input,
        password: hashedPassword,
        createdBy: authData.id
      } as UserEntity);
      const user = await this.usersRepository.save(data);

      if (!input.password) {
        this.mailService.sendTemporaryPassword(user.email, password);
      }

      return user;
    } catch (e) {
      return e.message;
    }
  }

  public async list() {
    return await this.usersRepository.find();
  }
}
