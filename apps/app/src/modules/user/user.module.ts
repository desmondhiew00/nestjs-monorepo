import { Module } from '@nestjs/common';
import { UserCrudResolver } from '@db/dto/user.dto';
import { UserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Module({
  imports: [
    UserCrudResolver({
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
