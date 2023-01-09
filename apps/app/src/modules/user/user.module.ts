import { Module } from '@nestjs/common';
import { UserCrudResolver } from '@db/entities/user.entity';

import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Module({
  imports: [
    UserCrudResolver.forFeature({
      resolver: {
        DTOClass: UserDTO, // Custom User DTO
        create: { disabled: true },
        update: { disabled: true },
        delete: { disabled: true }
      }
    })
  ],
  controllers: [],
  providers: [UserService]
})
export class UserModule {}
