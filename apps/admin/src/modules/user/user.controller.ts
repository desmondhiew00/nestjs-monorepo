import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  async getUsers(@Res() res: Response) {
    const data = await this.usersService.list();
    res.status(200).json({ data });
  }
}
