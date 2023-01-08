import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@db/entities/user.entity';
import { EncryptionModule } from '@lib/encryption';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtAuthStrategy } from './strategies/jwt.strategy';

const Strategies = [JwtAuthStrategy];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), JwtModule.register({}), EncryptionModule],
  providers: [...Strategies, AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
