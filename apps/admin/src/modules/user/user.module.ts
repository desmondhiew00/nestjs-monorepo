import { Module } from '@nestjs/common';
import { UserCrudResolver } from '@db/dto/user.dto';
import { EncryptionModule } from '@lib/encryption';

import { GqlJwtAuthGuard } from '../../guards/auth.guard';
import { MailModule } from '../mail/mail.module';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [
    EncryptionModule,
    MailModule,
    UserCrudResolver({
      resolver: {
        guards: [GqlJwtAuthGuard]
      }
    })
  ],
  controllers: [UserController],
  providers: [UserService, UserResolver]
})
export class UserModule {}
